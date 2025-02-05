import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "src/config/schema.ts",
    generates: {
        "src/config/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: './context#DataSourceContext',
            }
        }
    }
};

export default config;
