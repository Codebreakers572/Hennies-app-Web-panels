import productReducer from './ProductReducer'
import driversReducer from './DriversReducer'
import ProgressBarReducer from './ProgressBarReducer';
import ProfileReducer from './ProfileReducer';

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
    productReducer,
    driversReducer,
    ProgressBarReducer,
    ProfileReducer

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;