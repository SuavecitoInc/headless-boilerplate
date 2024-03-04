interface ShopConfig {
  title: string;
  description: string;
  headerHandle: string;
}

// const {
//   SHOPIFY_STOREFRONT_SCHEMA_URL: schemaUrl,
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN: apiToken,
// } = process.env;

const shopConfig: ShopConfig = {
  title: 'Headless Boilerplate Shop',
  description: 'A headless Shopify store built with Next.js and Shopify',
  headerHandle: 'next-header',
  // Add other configurations as needed
};

// Export the whole config object or individual properties
export default shopConfig;
export const { title, description, headerHandle } = shopConfig;
