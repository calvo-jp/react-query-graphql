import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

const countriesApi = process.env.NEXT_PUBLIC_COUNTRIES_API;

if (!countriesApi) throw new Error("Please set 'NEXT_PUBLIC_COUNTRIES_API' in your '.env'");

export const graphqlClient = new GraphQLClient(countriesApi, {
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
