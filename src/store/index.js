import { createStore, combineReducers } from 'redux'
import cartReducer from './reducers/cartReducer';
import clothesReducer from './reducers/clothesReducer';
import productReducer from './reducers/productReducer';

const reducers = combineReducers({
    clothesReducer,
})

const store = createStore(reducers);

export default store