import React from "react";
import style from './admin-main-menu.module.css'
import { CoffeeOutlined, EyeOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

export const AdminMainMenu = () => {
    const navigate = useNavigate();

    return (
        <div className={style.admin_page}>
            <h1 className={style.page_title}>Админ Меню</h1>
            <div className={style.admin_list_menu}>
                <div className={style.list_item} onClick={() => navigate('/admin/dish')}>
                    <CoffeeOutlined style={{ fontSize: '36px', color: '#08c' }}/>                    
                    <div className={style.card_title}>
                        Блюда
                    </div>
                </div>
                <div className={style.list_item} onClick={() => navigate('/admin/orders')}>                    
                    <EyeOutlined style={{ fontSize: '36px', color: '#08c' }}/>
                    <div className={style.card_title}>
                        Заказы
                    </div>
                </div>
                <div className={style.list_item} onClick={() => navigate('/admin/users')}>
                    <TeamOutlined style={{ fontSize: '36px', color: '#08c' }}/>                    
                    <div className={style.card_title}>
                        Пользователи
                    </div>
                </div>
            </div>
        </div>
    )
}