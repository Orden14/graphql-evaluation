import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "http://localhost:4000/", 
  documents: "src/app/**/*.graphql",
  generates: {
    "src/app/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-apollo-angular"
      ],
      config: {
        withComponent: false,
        withHooks: false,
        withMutationFn: true
      }
    }
  }
};

export default config;
