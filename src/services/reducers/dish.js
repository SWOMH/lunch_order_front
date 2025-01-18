import { DISH_REQUEST, DISH_ERROR, DISH_SUCCESS } from '../actions/dish';

const initialState = {
    dishes: [],
    loading: false,
    error: null,
};

export function dishReducer(state = initialState, action) {
    switch (action.type) {
        case DISH_REQUEST:
            return { ...state, loading: true };
        case DISH_SUCCESS:
            return { ...state, dishes: action.payload, loading: false };
        case DISH_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}