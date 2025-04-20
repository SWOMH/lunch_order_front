import React, { useEffect } from "react";
import style from './admin-dish.module.css';
import { useAppSelector } from "../../../../store/hooks";
import { selectAllDishes } from "../../../../store/selectors/dish/dishSelectors";
import { Button } from "antd";


export const AdminDishPage = () => {
    const dishes = useAppSelector(selectAllDishes);


    return (
        <div className={style.admin_dish_page}>
          <h1 className={style.page_dish_title}>Админ Меню</h1>
          {dishes.length > 0 && dishes.map(dish => (
            <div key={dish.id} className={style.cart_item}>
              <div className={style.cart_item_image}>
                <img 
                  src={dish.image || 'https://via.placeholder.com/80?text=Нет+фото'} 
                  alt={dish.name} 
                />
              </div>
              <div className={style.cart_item_content}>
                <h3 className={style.cart_item_name}>{dish.name}</h3>
                <span className={style.cart_item_desc}>{dish.description}</span>                            
                <p className={style.cart_item_price}>{dish.price} ₽</p>
              </div>
              <div className={style.cart_item_actions}>
                <Button className={style.cart_button} onClick={() => {}}>−</Button>                                                    
                <Button className={style.cart_button} type='primary' onClick={() => {}}>+</Button>
              </div>
            </div>
          ))}
        </div>
      )
}