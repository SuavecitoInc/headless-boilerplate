interface ShopConfig {
  title: string;
  logoUrl: string;
  apiToken: string;
  schemaUrl: string;
}

const {
  SHOPIFY_STOREFRONT_SCHEMA_URL: schemaUrl,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: apiToken,
} = process.env;

const shopConfig: ShopConfig = {
  title: 'Headless Boilerplate Shop',
  logoUrl: '/path/to/logo.png',
  apiToken: apiToken as string,
  schemaUrl: schemaUrl as string,
  // Add other configurations as needed
};

// Export the whole config object or individual properties
export default shopConfig;
export const { title, logoUrl } = shopConfig;
