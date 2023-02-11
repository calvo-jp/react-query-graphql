import { graphqlClient } from "@/config/client";
import { getSdk } from "@/__generated__/graphql";

export const getCountries = async () => {
  const { countries } = await getSdk(graphqlClient).Countries();
  return countries;
};

export const getLanguages = async () => {
  const { languages } = await getSdk(graphqlClient).Languages();
  return languages;
};
