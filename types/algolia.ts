export type ProductHit = {
  title: string;
  updated_at: string;
  _tags: Array<string>;
  handle: string;
  vendor: string;
  product_type: string;
  template_suffix: any;
  sku: string;
  barcode: string;
  position: number;
  requires_shipping: boolean;
  taxable: boolean;
  inventory_quantity: number;
  option1: string;
  option2: string;
  option3: string;
  id: number;
  tags: Array<string>;
  option_names: Array<string>;
  variants_count: number;
  variants_min_price: number;
  variants_max_price: number;
  variants_compare_at_price_min: number;
  variants_compare_at_price_max: number;
  variants_inventory_count: number;
  product_image: string;
  published_at: string;
  body_html_safe: string;
  variant_title: string;
  inventory_policy: string;
  inventory_available: boolean;
  options: {
    fragrance: string;
    edition: string;
    size: string;
  };
  price: number;
  compare_at_price: number;
  price_ratio: number;
  price_range: string;
  grams: number;
  weight: string;
  image: string;
  named_tags: {};
  named_tags_names: Array<string>;
  created_at: string;
  objectID: string;
  _snippetResult: {
    body_html_safe: {
      value: string;
      matchLevel: string;
    };
  };
  _highlightResult: {
    title: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    handle: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    vendor: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    product_type: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    sku: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    barcode: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    tags: Array<{
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    }>;
    body_html_safe: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
    variant_title: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    };
  };
  __autocomplete_indexName: string;
  __autocomplete_algoliaCredentials: {
    appId: string;
    apiKey: string;
  };
  __autocomplete_id: number;
};
