import { getReducerItem } from "../../utils"

const cartState = {
    isVisibleOverlay: false,
    items: []
}


const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case 'ON_HANDLE_CART' :
            return {
                ...state,
                isVisibleOverlay: !state.isVisibleOverlay,
            }
        case 'ON_ADD_TO_CART' :
            return {
                ...state,
                items: state.items.concat([action.payload]),
            }
        case 'ON_INCREMENT' :
            return {
                ...state,
                items: getReducerItem(state, action, 1),
            }
        case 'ON_DECREMENT' :
            return {
                ...state,
                items: getReducerItem(state, action, -1),
            }
        default:
            return state
    }
     

}
export default cartReducer