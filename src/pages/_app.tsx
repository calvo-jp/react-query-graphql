import { queryClient } from "@/config/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps: { dehydratedState, ...pageProps } }: AppProps) {
  const [client] = useState(() => queryClient);

  return (
    <>
      <Head>
        <title>ReactQuery + GraphQL</title>
      </Head>

      <style jsx global>{`
        body {
          font-family: "Oxygen", sans-serif;
          background-color: white;
          color: #262626;
        }

        *,
        *::after,
        *::before {
          margin: 0px;
          padding: 0px;
        }

        ul,
        ol {
          list-style: none;
          padding: 0px;
        }

        table {
          border-collapse: collapse;
        }

        td {
          padding: 0.5rem 1rem;
        }
      `}</style>

      <QueryClientProvider client={client}>
        <ReactQueryDevtools position="bottom-right" />

        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
