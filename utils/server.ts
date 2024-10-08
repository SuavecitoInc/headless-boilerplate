'use server';

/**
 * Asynchronously fetches data from a Shopify storefront API.
 *
 * This function constructs a request to Shopify's GraphQL API using provided query and variables.
 * It is generic and allows specifying the expected response type `<T>`, which corresponds to the
 * expected shape of the data returned by the storefront API. The function supports optional
 * caching of the response and tagging of requests for more granular cache control. The Shopify
 * API credentials and details (API token, storefront name, and API version) are read from
 * environment variables.
 *
 * @param {FetchStorefront} params - An object containing the necessary parameters for the fetch operation:
 * - `query`: A string representing the GraphQL query.
 * - `variables`: An optional parameter for any variables required by the GraphQL query.
 * - `shouldCache`: An optional boolean flag indicating whether the response should be cached (`true` by default).
 * - `tag`: An optional string for tagging the request for data validation purposes.
 * @returns {Promise<FetchStorefrontResponse<T>>} A promise that resolves with the JSON response from the Shopify API,
 * where `<T>` defines the type of the data in the response, aligning with the expected storefront data structure.
 *
 * @throws {Error} Throws an error if there is an issue with fetching data from the Shopify API or if the response status is not OK.
 *
 */

type FetchStorefrontResponse<T> = {
  data: T;
  errors?: any;
};

type FetchStorefront = {
  query: string;
  variables?: any;
  cache?: boolean;
  tag?: string;
};

export async function fetchStorefront<T>({
  query,
  variables,
  cache = false,
  tag,
}: FetchStorefront): Promise<FetchStorefrontResponse<T>> {
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
      cache: cache ? 'default' : 'no-cache',
      next: tag
        ? {
            tags: [tag],
          }
        : undefined,
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data as FetchStorefrontResponse<T>;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data from Shopify API:', error);
    throw error;
  }
}
