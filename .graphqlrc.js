require("@next/env").loadEnvConfig(process.cwd());

/** @type {import('graphql-config').IGraphQLConfig} */
module.exports = {
  schema: process.env.NEXT_PUBLIC_COUNTRIES_API,
  documents: "src/**/*.{gql,graphql}",
  extensions: {
    codegen: {
      generates: {
        "src/__generated__/graphql.ts": {
          overwrite: true,
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-graphql-request",
            {
              add: {
                content: "/* eslint-disable */",
              },
            },
          ],
          config: {
            gqlImport: "graphql-request#gql",
            addDocBlocks: false,
            dedupeFragments: true,
            pureMagicComment: true,
            disableDescriptions: true,
          },
        },
      },
    },
  },
};
