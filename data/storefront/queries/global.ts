export const MENU_QUERY = `#graphql
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      id
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;
