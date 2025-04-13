import React, { FC, useState, useEffect } from 'react';
import { IVariants } from '../../../types/dish-types';
import styled from './variant-window.module.css';
import { Button, Segmented } from 'antd';

interface VariantWindowProps {
    variant: IVariants[] | null;
}

const VariantWindow: FC<VariantWindowProps> = ({ variant }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        if (variant && variant.length > 0) {
            setSelectedValue(variant[0].size);
        }
    }, [variant]);

    if (!variant || variant.length === 0) {
        return <div>Нет доступных вариантов</div>;
    }

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
                size="large"
                options={options}
                value={selectedValue}
                onChange={(value) => {
                    setSelectedValue(value);
                    console.log('Выбран вариант:', value);
                }}
            />
            <Button className={styled.button}>
                Добавить {selectedValue && `(${selectedValue})`}
            </Button>
        </div>
    );
};

export default VariantWindow;