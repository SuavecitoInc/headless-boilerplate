'use server';

/**
 * Asynchronously fetches data from a Shopify storefront API.
 *
 * This function constructs a request to Shopify's GraphQL API using provided query and variables. It allows for optional caching of the response and tagging of requests for more granular cache control. The Shopify API credentials and details (API token, storefront name, and API version) are read from environment variables.
 *
 * @param {FetchStorefront} params - An object containing the necessary parameters for the fetch operation:
 * - `query`: A string representing the GraphQL query.
 * - `variables`: An optional parameter for any variables required by the GraphQL query.
 * - `shouldCache`: An optional boolean flag indicating whether the response should be cached (`true` by default).
 * - `tag`: An optional string for tagging the request for data validation purposes.
 * @returns {Promise<any>} A promise that resolves with the JSON response from the Shopify API.
 *
 * @throws {Error} Throws an error if there is an issue with fetching data from the Shopify API or if the response status is not OK.
 *
 */

type FetchStorefront = {
  query: string;
  variables?: any;
  shouldCache?: boolean;
  tag?: string;
};

export async function fetchStorefront({
  query,
  variables,
  shouldCache = true,
  tag,
}: FetchStorefront) {
  try {
    const {
      SHOPIFY_STOREFRONT_SCHEMA_URL: schemaUrl,
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: apiToken,
    } = process.env;
    const fetchHeaders = new Headers();
    fetchHeaders.set('Content-Type', 'application/json');
    fetchHeaders.set('X-Shopify-Storefront-Access-Token', apiToken as string);

    const response = await fetch(schemaUrl as string, {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: shouldCache ? 'default' : 'no-cache',
      next: tag
        ? {
            tags: [tag],
          }
        : undefined,
    });

    const data = await response.json();
    console.log('data', data);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data from Shopify API:', error);
    throw error;
  }
}
