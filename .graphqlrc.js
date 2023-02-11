/** @type {import('graphql-config').IGraphQLConfig} */
module.exports = {
  schema: "https://countries.trevorblades.com",
  documents: "src/**/*.{ts,tsx,gql,graphql}",
  extensions: {
    codegen: {
      generates: {
        "src/__generated__/graphql.ts": {
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
