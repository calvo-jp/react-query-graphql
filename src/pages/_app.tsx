import { queryClient } from "@/config/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";

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
