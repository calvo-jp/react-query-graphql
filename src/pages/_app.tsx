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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          box-sizing: border-box;
        }

        ul,
        ol {
          list-style-position: inside;
        }

        table {
          border-collapse: collapse;
        }

        td,
        th {
          border: 1px solid #d4d4d4;
          padding: 0.65rem 1rem;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:hover {
          color: #7c3aed;
        }

        small {
          font-size: 14px;
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
