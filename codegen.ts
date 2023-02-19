
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/lib/schema.graphql",
  documents: "./src/**/*.tsx",
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    },
  },
  ignoreNoDocuments: true,
  
};

export default config;
