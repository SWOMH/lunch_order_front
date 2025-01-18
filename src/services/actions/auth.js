import axios from 'axios';
import { API_URL_LOGIN } from '../../utils/api-constant';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_UNDEFINED = 'USER_UNDEFINED';


export const loginUser = (telegramId) => {
    return async (dispatch) => {
        dispatch({type: USER_LOGIN_REQUEST});
        try {
            const response = await axios.get(`${API_URL_LOGIN}/${telegramId}`);
            if (response.status === 200 && response.data) {
                dispatch({type: USER_LOGIN_SUCCESS, payload: response.data});
            } else {
                dispatch({type: USER_UNDEFINED});
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                dispatch({type: USER_UNDEFINED});
            } else {
                dispatch({type: USER_LOGIN_ERROR, payload: error});
            }
        }
    }
}

