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
            name
            items {
                displayValue
                value
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
