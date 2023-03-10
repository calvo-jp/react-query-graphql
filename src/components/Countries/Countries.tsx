// Combination of ssr and client
// Countries are prerendered
// Languages are fetched on client

import { graphqlClient, queryClient } from "@/config/client";
import { getSdk } from "@/__generated__/graphql";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { dehydrate, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery(["countries"], () => getSdk(graphqlClient).Countries());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Countries() {
  // prerendered
  // should no longer show loading
  // should not create a network request
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getSdk(graphqlClient).Countries(),
  });

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Languages />

      <div
        style={{
          marginTop: 14,
        }}
      >
        {isLoading && <Loader />}
        {!isLoading && (
          <ul>
            {data?.countries.map(({ code, name }) => (
              <li key={code}>
                <Link href={`/${code}`}>{name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Languages() {
  // not prerendered
  // should create a network request
  const { data, isLoading } = useQuery({
    queryKey: "languages",
    queryFn: () => getSdk(graphqlClient).Languages(),
  });

  return (
    <div>
      {isLoading && <Loader>Loading langs...</Loader>}
      {!isLoading && <small>Languages: {data?.languages.length}</small>}
    </div>
  );
}

// Stupid loader
function Loader({ children = "Loading..." }: PropsWithChildren) {
  return (
    <small
      style={{
        color: "#71717a",
      }}
    >
      {children}
    </small>
  );
}
