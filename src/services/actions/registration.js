import axios from 'axios';
import { API_USER_REGISTER } from '../../utils/api-constant';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';


export const registerUser = (telegramId, fullName) => {
    return async (dispatch) => {
        dispatch({type: USER_REGISTER_REQUEST});
        try {
            const response = await axios.post(`${API_USER_REGISTER}/${telegramId}`, {fullName});
            if (response.status === 200) {
                dispatch({type: USER_REGISTER_SUCCESS, payload: response.data});
            } else if (response.status === 404) {
                dispatch({type: USER_REGISTER_ERROR, payload: response.data});
            }
        } catch (error) {
            dispatch({type: USER_REGISTER_ERROR, payload: error});
        }
    }
}