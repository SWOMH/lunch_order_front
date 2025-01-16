export const ADD_DISH = 'ADD_DISH';
export const REMOVE_DISH = 'REMOVE_DISH';


export const addDish = (dish) => {
    return { type: ADD_DISH, payload: dish };
}

export const removeDish = (dish) => {
    return { type: REMOVE_DISH, payload: dish };
}