export const DISH_REQUEST = 'DISH_REQUEST';
export const DISH_ERROR = 'DISH_ERROR';
export const DISH_SUCCESS = 'DISH_SUCCESS';

export const getDishes = () => {
    return async (dispatch) => {
        dispatch({type: DISH_REQUEST});
    }
}