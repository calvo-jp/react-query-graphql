import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

export const graphqlClient = new GraphQLClient("https://countries.trevorblades.com", {
  async requestMiddleware(request) {
    const token = "";

    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  },
});

export const queryClient = new QueryClient();
