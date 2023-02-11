// Combination of ssr and client
// Countries are prerendered
// Languages are fetched on client

import { graphqlClient, queryClient } from "@/config/client";
import { getSdk } from "@/__generated__/graphql";
import { GetServerSideProps } from "next";
import Link from "next/link";
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
    refetchOnMount: false,
  });

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Languages />

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
  );
}

function Languages() {
  // not prerendered
  // should create a network request
  const { data } = useQuery({
    queryKey: "languages",
    queryFn: () => getSdk(graphqlClient).Languages(),
    // with initialData but will be replaced
    // because 'refetchOnMount' is true be default
    initialData: {
      languages: [],
    },
  });

  return (
    <div
      style={{
        marginBottom: 16,
      }}
    >
      <p>Languages: {data?.languages.length}</p>
    </div>
  );
}

// Stupid loader
function Loader() {
  return (
    <p
      style={{
        color: "#71717a",
        fontSize: "14px",
      }}
    >
      Loading...
    </p>
  );
}
