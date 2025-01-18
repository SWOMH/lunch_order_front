import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR } from '../actions/registration';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export function registrationReducer(state = initialState, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case USER_REGISTER_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}
