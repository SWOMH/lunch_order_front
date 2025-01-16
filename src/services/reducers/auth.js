import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_UNDEFINED } from '../actions/auth';

const initialState = {
    user: null,
    loading: false,
    error: null,
    undefined: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case USER_LOGIN_ERROR:
            return { ...state, error: action.payload, loading: false };
        case USER_UNDEFINED:
            return { ...state, undefined: true, loading: false };
        default:
            return state;
    } 
}

