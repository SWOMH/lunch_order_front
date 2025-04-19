import React, { FC, useState, useEffect } from 'react';
import { IDish, IVariants } from '../../../../types/dish-types';
import styled from './variant-window.module.css';
import { Button, Segmented } from 'antd';
import { useAppDispatch } from '../../../../store/hooks';
import { addToCart } from '../../../../store/slices/orderingSlice';

interface VariantWindowProps {
    dish: IDish;
    variant: IVariants[] | null;
}

const VariantWindow: FC<VariantWindowProps> = ({ dish, variant }) => {
    const dispatch = useAppDispatch()
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        if (variant && variant.length > 0) {
            setSelectedValue(variant[0].size);
        }
    }, [variant]);

    if (!variant || variant.length === 0) {
        return <div>Нет доступных вариантов</div>;
    }
    
    

    const handleClick = () => {
        const variant_s = variant.filter(v => v.size === selectedValue)
        const selectedVariant = variant_s[0];
        dispatch(addToCart({
            dish_id: dish.id,
            variant_id: selectedVariant?.id 
        }));
    };

    const options = variant.map(v => ({
        label: (
            <div style={{ padding: 4 }}>
                <div>{v.size}</div>
                <div>{v.price} ₽</div>
            </div>
        ),
        value: v.size,
    }));

    return (
        <div className={styled.container}>
            <Segmented<string>
                className={styled.segment}
                options={options}
                value={selectedValue}
                onChange={(value) => {
                    setSelectedValue(value);
                }}
            />
            <Button className={styled.button} onClick={handleClick}>
                Добавить {selectedValue && `(${selectedValue})`}
            </Button>
        </div>
    );
};

export default VariantWindow;