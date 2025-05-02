export const API_URL_HOST = 'http://localhost:80';

// USER
export const API_USER_GET_INFO = `${API_URL_HOST}/user`;
export const API_USER_REGISTER = `${API_USER_GET_INFO}/register`;
export const API_USER_ALL_ORDERS = `${API_USER_GET_INFO}/orders`;
export const API_USER_ACTUAL_ORDERS = `${API_USER_ALL_ORDERS}/actual`;

// DISH
export const API_GET_ALL_DISH = `${API_URL_HOST}/dish`


// ORDERS
export const API_URL_ORDER = `${API_URL_HOST}/order`;
export const API_URL_ORDER_HISTORY = `${API_URL_HOST}/history`;


// ADMIN
export const API_ADMIN_GET_ALL_USERS = `${API_URL_HOST}/user/get_users`
export const API_ADMIN_EDIT_USER_STATUS = `${API_URL_HOST}/user/edit_status`
export const API_ADMIN_URL_ALL_ORDERS = `${API_URL_HOST}/order/actual_orders`
export const API_ADMIN_URL_EDIT_ORDER = `${API_URL_HOST}/order/edit_status`
export const API_ADMIN_GET_ALL_DISH = `${API_URL_HOST}/dish/all_dish`
export const API_ADMIN_ADD_DISH = `${API_URL_HOST}/dish/add`
export const API_ADMIN_EDIT_DISH = `${API_URL_HOST}/dish/update` // put запрос в url передать id dish
export const API_REMOVE_DISH_FROM_ORDER = `${API_URL_HOST}/order/remove_dish_from_order`;