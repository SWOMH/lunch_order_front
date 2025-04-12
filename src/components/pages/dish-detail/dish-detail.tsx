import React, { FC } from 'react';
import styles from './dish-detail.module.css';
import { IDish } from '../../../types/dish-types';
import { GitlabOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

interface IDishProps {
    dish: IDish;
}

const DishDetails: FC<IDishProps> = (dish) => {
    const dish_el = dish.dish
    console.log(dish_el.name)

    if (!dish) {
        return <div>Блюдо не найден</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={`${styles.title} text text_type_main-large pl-10 pr-10 pt-10`}>
                    {dish_el.name}
                </h2>
            </div>
            { dish_el.image ? 
            <img         
                // @ts-ignore
                src={dish_el.image} 
                alt={dish_el.name} 
                className={styles.image}
            /> : <GitlabOutlined />}
            <Divider>Описание</Divider>
            <div className={`${styles.nutrients} mt-8 pb-15`}>
                <div className={styles.nutrient}>
                    <span className="text text_type_digits-default text_color_inactive">{dish_el.description}</span>
                </div>                
            </div>
        </div>
    );
};


export default DishDetails; 