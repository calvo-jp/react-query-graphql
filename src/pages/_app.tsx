import { queryClient } from "@/config/client";
import "@/styles/globals.css";
import { Oxygen } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const oxygen = Oxygen({
  style: ["normal"],
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
  adjustFontFallback: true,
});

export default function App({ Component, pageProps: { dehydratedState, ...pageProps } }: AppProps) {
  const [client] = useState(() => queryClient);

  return (
    <Fragment>
      <Head>
        <title>ReactQuery + GraphQL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <QueryClientProvider client={client}>
        <ReactQueryDevtools position="bottom-right" />

        <Hydrate state={dehydratedState}>
          <main className={oxygen.className}>
            <Component {...pageProps} />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </Fragment>
  );
}
