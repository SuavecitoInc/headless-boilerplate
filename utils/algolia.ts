import algoliasearch from 'algoliasearch';

const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
export const searchClient = algoliasearch(appId, apiKey);
