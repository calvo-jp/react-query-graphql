import { graphqlClient } from "@/config/client";
import { CountryQuery, getSdk } from "@/__generated__/graphql";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useQuery } from "react-query";

type Props = {
  country: NonNullable<CountryQuery["country"]>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const code = params?.code?.toString();

  if (!code) return { notFound: true };

  const { country } = await getSdk(graphqlClient).Country({ code });

  if (!country) return { notFound: true };

  return { props: { country } };
};

export default function Country({ country }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["country", country.code],
    queryFn: () => getSdk(graphqlClient).Country({ code: country.code }),
    initialData: { country },
  });

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Link href="/">Go back</Link>

      {isLoading && <Loader />}
      {!isLoading && (
        <table
          border={1}
          style={{
            marginTop: 24,
          }}
        >
          <tbody>
            {Object.entries(data?.country ?? {}).map(([key, value], idx) => (
              <tr key={`${key}${value}${idx}`}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

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
