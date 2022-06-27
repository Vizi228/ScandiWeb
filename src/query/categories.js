import { gql } from "@apollo/client";


export const GET_CURRENCIES_DATA = gql`
    query {
        currencies{
            label
            symbol
        }
  }
`
export const GET_CATEGORIES_DATA = gql`
    query {
        categories {
            name
          }
    }
`
export const GET_DATA = (title) => (gql`
        query {
            category(input: {title: "${title}"}) {
            name
            products {
                id
                    name
                    inStock
                    gallery
                    prices {
                        currency {
                            label
                            symbol
                        }
                        amount
                    }
             }
            }
        }
`)   