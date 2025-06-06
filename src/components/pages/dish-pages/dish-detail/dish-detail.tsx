import React, { FC } from 'react';
import styles from './dish-detail.module.css';
import { IDish } from '../../../../types/dish-types';
import { GitlabOutlined } from '@ant-design/icons';
import { Divider, Empty, Image } from 'antd';
import VariantWindow from './variant-window';

interface IDishProps {
    dish: IDish;
}

const DishDetails: FC<IDishProps> = (dish) => {
    const dish_el = dish.dish

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
            <Image
            className={styles.image}
            src={dish_el.image} /> 
            : <Empty />}
            <Divider className={styles.divider}>Описание</Divider>
            <div className={`${styles.nutrients} mt-8 pb-15`}>
                <div className={styles.nutrient}>
                    <span className={styles.text}>{dish_el.description}</span>
                </div>          
            </div>
            {dish_el.additives 
            ? <VariantWindow dish={dish_el} variant={dish_el.variants}/>
            : <div>Добавки не найдены</div> }
        </div>
    );
};


export default DishDetails; 