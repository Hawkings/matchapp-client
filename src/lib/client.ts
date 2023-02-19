import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
	uri: "http://localhost:7777/graphql",
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:7777/subscriptions",
	}),
);

let context = {
	token: undefined as string | undefined,
};

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		authorization: context.token ? `Bearer ${context.token}` : "",
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
