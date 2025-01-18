import { ORDER_REQUEST, ORDER_ERROR, ORDER_SUCCESS } from '../actions/order';

const initialState = {
    order: null,    
    loading: false,
    error: null,
};


export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case ORDER_REQUEST:
            return { ...state, loading: true };
        case ORDER_SUCCESS:
            return { ...state, order: action.payload, loading: false };
        case ORDER_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}