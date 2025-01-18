import { ADD_DISH, REMOVE_DISH } from '../actions/bucket';

const initialState = {
    dishes: [],
    totalPrice: 0,
    totalCount: 0,
};

export function bucketReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DISH:
            return { ...state, dishes: [...state.dishes, action.payload], totalPrice: state.totalPrice + action.payload.price, totalCount: state.totalCount + 1 };
        case REMOVE_DISH:
            return { ...state, dishes: state.dishes.filter(dish => dish.id !== action.payload.id), totalPrice: state.totalPrice - action.payload.price, totalCount: state.totalCount - 1 };
        default:
            return state;
    }
}