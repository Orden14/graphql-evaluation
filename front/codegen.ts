
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../back/src/config/schema.ts",
  generates: {
    "../back/src/config/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context#DataSourceContext',
      }
    }
  }
};

export default config;
