import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_UNDEFINED } from '../actions/auth';

const initialState = {
    user: null,
    username: null,
    isLoading: false,
    hasError: false,
    isUndefined: false,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                hasError: false,
                isUndefined: false
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                hasError: false,
                isUndefined: false
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                hasError: true,
                error: action.payload
            };
        case USER_UNDEFINED:
            return {
                ...state,
                isLoading: false,
                isUndefined: true
            };
        default:
            return state;
    }
};

