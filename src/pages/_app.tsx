import { queryClient } from "@/config/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/types/react";

export default function App({ Component, pageProps: { dehydratedState, ...pageProps } }: AppProps) {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
