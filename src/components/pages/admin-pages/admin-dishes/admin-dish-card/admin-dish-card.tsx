import React, { useState } from "react";
import style from './admin-dish-card.module.css';
import { Button, Modal } from "antd";
import { IDish } from "../../../../../types/dish-types";
import DishEditForm from "../admin-dish-edit-modal/admin-dish-edit-modal";

interface IDishCardProps {
    dish: IDish;
    // onDishUpdate: (updatedDish: IDish) => void;
};

interface IDishEditButtonProps {
    setIsModalOpen: (value: boolean) => void;
};
  
const DishEditButton: React.FC<IDishEditButtonProps> = ({ setIsModalOpen }) => {
    const handleOpenModalClick = () => {
      setIsModalOpen(true);
    };
  
    return (
      <div className={style.edit_buttons}>
        {/* <Button className={style.cart_button} onClick={() => {}}>Убрать из меню</Button> */}
        <Button type="primary" onClick={handleOpenModalClick}>Изменить</Button>
      </div>
    );
}

export const AdminDishCard: React.FC<IDishCardProps> = ({ dish }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div key={dish.id} className={style.cart_item}>
              <Modal 
                title="Редактирование блюда"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
              >
                <DishEditForm 
                  dish={dish} 
                  onSave={handleCancel} 
                  onCancel={handleCancel} 
                />
              </Modal>
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
                { !dish.available ? 
                <Button className={style.cart_button_green} type="primary">Вернуть в меню</Button>
                : <DishEditButton setIsModalOpen={setIsModalOpen}/>}
              </div>
            </div>
    );
}