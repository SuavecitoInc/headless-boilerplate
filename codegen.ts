import dotenv from 'dotenv';
import { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config({
  path: '.env.local',
});

const schemaUrl = process.env.SHOPIFY_STOREFRONT_SCHEMA_URL as string;
const schemaToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [schemaUrl]: {
        headers: {
          'X-Shopify-Storefront-Access-Token': schemaToken,
        },
      },
    },
  ],
  generates: {
    './types/storefront.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
