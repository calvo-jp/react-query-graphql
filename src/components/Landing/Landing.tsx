// Combination of ssr and client
// Countries are prerendered
// Languages are fetched on client

import { queryClient } from "@/config/client";
import { GetServerSideProps } from "next";
import { dehydrate, useQuery } from "react-query";
import { getCountries, getLanguages } from "./utils";

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery(["countries"], getCountries);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index() {
  // prerendered
  // should no longer show loading
  // should not create a network request
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
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
        <pre
          style={{
            margin: 0,
            padding: 24,
            backgroundColor: "#f5f5f5",
            maxWidth: "100%",
          }}
        >
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}

function Languages() {
  // not prerendered
  // should display loading
  const { data, isLoading } = useQuery({
    queryFn: getLanguages,
    queryKey: "languages",
    refetchOnMount: false,
  });

  return (
    <div
      style={{
        marginBottom: 16,
      }}
    >
      {isLoading && <Loader message="Loading langs..." />}
      {!isLoading && <p>Languages: {data?.length}</p>}
    </div>
  );
}

// Stupid loader
function Loader({ message = "Loading..." }: { message?: string }) {
  return (
    <p
      style={{
        color: "#71717a",
        fontSize: "14px",
      }}
    >
      {message}
    </p>
  );
}
