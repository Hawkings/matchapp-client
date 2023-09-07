import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { makeObservable, action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { createContext, PropsWithChildren, useContext } from "react";

export enum ConnectionStatus {
	/** The connection has not been established yet */
	NOT_STARTED,
	/** The connection is active */
	CONNECTED,
	/** The connection isn't active, but could be restored. */
	RECOVERABLE_ERROR,
	/** The connection isn't active and cannot be restored. */
	FATAL_ERROR,
}

export interface ObservableConnection {
	status: ConnectionStatus;
	latency: number;
	setToken(token: string | undefined): void;
}

export class Connection implements ObservableConnection {
	private token: string | undefined;
	status: ConnectionStatus = ConnectionStatus.NOT_STARTED;
	private activeSocket: WebSocket | undefined;
	private pingSentAt = 0;
	private connectionTimeout = 0 as unknown as NodeJS.Timeout;
	latency = NaN;
	readonly client: ApolloClient<NormalizedCacheObject>;

	constructor() {
		makeObservable(this, {
			setToken: action,
			status: observable,
			latency: observable,
		});
		const httpLink = createHttpLink({
			uri: "http://localhost:7777/graphql",
		});
		const self = this;
		const wsLink = new GraphQLWsLink(
			createClient({
				// url: "wss://hawkings.dev/subscriptions",
				url: "ws://localhost:7777/subscriptions",
				connectionParams: {
					get authToken() {
						return self.token;
					},
				},
				shouldRetry: () => true,
				keepAlive: 1_000,
				on: {
					connected: action((socket, payload) => {
						if (payload && "error" in payload) {
							console.error("ws error", payload.error);
							this.token = undefined;
							this.status = ConnectionStatus.FATAL_ERROR;
							(socket as WebSocket).close();
						}
					}),
					opened: action(socket => {
						console.log("connection opened");
						this.status = ConnectionStatus.CONNECTED;
						this.activeSocket = socket as WebSocket;
					}),
					closed: action(() => {
						console.log("connection closed");
						this.status = ConnectionStatus.RECOVERABLE_ERROR;
					}),
					ping: action(received => {
						if (!received) {
							this.pingSentAt = performance.now();
							this.connectionTimeout = setTimeout(
								action(() => {
									if (this.activeSocket?.readyState === WebSocket.OPEN) {
										this.activeSocket.close(4408, "Request Timeout");
										console.log("timeout");
										this.status = ConnectionStatus.FATAL_ERROR;
									}
								}),
								3_000,
							);
						}
					}),
					pong: action(received => {
						if (received) {
							this.latency = performance.now() - this.pingSentAt;
							clearTimeout(this.connectionTimeout);
						}
					}),
				},
			}),
		);
		const splitLink = split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return definition.kind === "OperationDefinition" && definition.operation === "subscription";
			},
			wsLink,
			httpLink,
		);
		const authLink = setContext((_, { headers }) => ({
			headers: {
				...headers,
				authorization: this.token || "",
			},
		}));
		this.client = new ApolloClient({
			cache: new InMemoryCache(),
			link: authLink.concat(splitLink),
		});
	}

	setToken(token: string | undefined) {
		this.token = token;
	}

	getClient() {
		return this.client;
	}
}

// While the connection is not initialized at first, no children will be rendered until the
// connection is created, so it's safe to type this as `Connection`.
const ConnectionContext = createContext<ObservableConnection>({} as ObservableConnection);

export const ConnectionProvider = observer(
	({ connection, children }: PropsWithChildren<{ connection: Connection }>) => {
		if (!connection.client) return null;

		// Explicitly use the observable properties of connection so that mobx rerenders this
		// component when they change. If we directly use value={connection} the component will not
		// pick up the changes.
		const observableConnection: ObservableConnection = {
			status: connection.status,
			latency: connection.latency,
			setToken: token => connection.setToken(token),
		};

		return (
			<ConnectionContext.Provider value={observableConnection}>
				<ApolloProvider client={connection.client}>{children}</ApolloProvider>
			</ConnectionContext.Provider>
		);
	},
);

export function useConnection() {
	return useContext(ConnectionContext);
}
