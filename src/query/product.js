import { gql } from "@apollo/client";


export const GET_PRODUCT = (id) => gql`
query {
    product(id: "${id}") {
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
`
