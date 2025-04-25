import React, { useEffect, useState } from "react";
import style from './admin-dish.module.css';
import { useAppSelector } from "../../../../store/hooks";
import { selectAllDishes } from "../../../../store/selectors/dish/dishSelectors";
import { Button, Modal } from "antd";
import { IDish } from "../../../../types/dish-types";
import DishDetails from "../../dish-pages/dish-detail/dish-detail";
import { AdminDishCard } from "./admin-dish-card/admin-dish-card";
import DishAddForm from "./admin-dish-add/admin-dish-add";



export const AdminDishPage = () => {
    const dishes = useAppSelector(selectAllDishes);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalClick = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
        <div className={style.admin_dish_page}>          
          <h1 className={style.page_dish_title}>Админ Меню</h1>
          <Modal 
            title="Редактирование блюда"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={800}
          >
              <DishAddForm 
              onSave={handleCancel} 
              onCancel={handleCancel} 
              />
          </Modal>
          <Button className={style.button_add} onClick={handleOpenModalClick}>Добавить новое блюдо</Button>
          {dishes.length > 0 && dishes.map(dish => (            
            <AdminDishCard dish={dish}/>
          ))}
        </div>
      )
}