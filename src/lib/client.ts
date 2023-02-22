import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
	uri: "https://hawkings.dev/graphql",
});

let context = {
	token: undefined as string | undefined,
};

const wsLink = new GraphQLWsLink(
	createClient({
		url: "wss://hawkings.dev/subscriptions",
		connectionParams: {
			get authToken() {
				return context.token;
			},
		},
	}),
);

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		authorization: context.token || "",
	},
}));

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	},
	wsLink,
	httpLink,
);

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(splitLink),
});

export function setToken(token: string) {
	context.token = token;
}

window.addEventListener("beforeunload", () => {
	client.mutate({
		mutation: "mutation Logout { logout }" as any,
	});
});
