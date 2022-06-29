import { createStore, combineReducers } from 'redux'
import cartReducer from './reducers/cartReducer';
import clothesReducer from './reducers/clothesReducer';

const reducers = combineReducers({
    clothesReducer,
    cartReducer,
})

const store = createStore(reducers);

export default store