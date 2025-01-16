import axios from 'axios';
import { API_URL_ORDER } from '../../utils/api-constant';


export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_ERROR = 'ORDER_ERROR';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';

export const orderFood = (order) => {
    return async (dispatch) => {
        dispatch({type: ORDER_REQUEST});
        try {
            const response = await axios.post(`${API_URL_ORDER}`, order);
            if (response.status === 200) {
                dispatch({type: ORDER_SUCCESS, payload: response.data});
            } else {
                dispatch({type: ORDER_ERROR, payload: response.data});
            }
        } catch (error) {
            dispatch({type: ORDER_ERROR, payload: error});
        }
    }
}