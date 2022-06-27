const clothesState = {
    items: [],
    activeCurrency: 'USD',
    activeCategory: 'all',
}

const clothesReducer = (state = clothesState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CURRENCY':
            return {
                ...state,
                activeCurrency: action.payload
            }
        case 'SET_ACTIVE_CATEGORY':
            return {
                ...state,
                activeCategory: action.payload
            }
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}

export default clothesReducer