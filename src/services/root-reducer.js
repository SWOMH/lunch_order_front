import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth';
import { registrationReducer } from './reducers/registeration';
import { dishReducer } from './reducers/dish';
import { orderReducer } from './reducers/order';
import { bucketReducer } from './reducers/bucket';

export const rootReducer = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    dish: dishReducer,
    order: orderReducer,
    bucket: bucketReducer
});