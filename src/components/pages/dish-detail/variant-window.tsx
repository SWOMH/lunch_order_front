import React, { FC } from 'react';
import { IVariants } from '../../../types/dish-types';
import styled from './variant-window.module.css';
import { Button } from 'antd';

interface VariantWindowProps {
    variant: IVariants;
}

const VariantWindow:FC<VariantWindowProps> = (variant) => {
    const variant_el = variant.variant

    return (
        <div className={styled.container}>
            <div className='variant-name'>{variant_el.size}</div>
            <div className='variant-price'>{variant_el.price} руб.</div>
            <Button className={styled.button}>Добавить</Button>
        </div>
    )
};

export default VariantWindow;