import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

export const graphqlClient = new GraphQLClient("https://countries.trevorblades.com", {
  async requestMiddleware(request) {
    // get token here

    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: "Bearer <token>",
      },
    };
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      keepPreviousData: true,
    },
  },
});
