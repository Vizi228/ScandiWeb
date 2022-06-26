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
export const GET_DATA = gql`
        query {
            categories {
            name
            products {
                id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
                }
                    prices {
                currency {
                    label
                    symbol
                }
                 amount
                }
                    brand
             }
            }
        }
`   