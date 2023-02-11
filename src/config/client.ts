import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query/types/core";

export const queryClient = new QueryClient();
export const graphqlClient = new GraphQLClient("https://countries.trevorblades.com");
