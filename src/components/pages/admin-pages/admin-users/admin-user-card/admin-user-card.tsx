import React, { FC } from "react";

import style from './admin-user-card.module.css'
import { IAdminUsers } from "../../../../../types/user-types";
import { Button } from "antd";

interface IUserCard {
    user: IAdminUsers;
}

export const AdminUserCard: React.FC<IUserCard> = ({ user }) => {

    const getStatusClass = (status: boolean) => {
        switch(status) {
            case true:
                return style.status_cancelled;
            case false:
                return style.status_completed;        
            default:
                return style.status_pending;
        }
    };


    return (
      <div className={style.order_card}>
            <div className={style.order_header}>
                <div>
                    <span className={style.order_number}>{user.name}</span>
                    <span className={style.order_date}>{user.telegram_name ? `Телеграм имя: ${user.telegram_name}` : ''}</span>
                </div>
                <span className={`${style.order_status} ${getStatusClass(user.banned)}`}>
                    {!user.banned ? 'Работает' : 'Заблокирован'}
                </span>
            </div>

            <div className={style.order_total}>
                <span>Действие:</span>
                {!user.banned 
                ? <Button danger>Заблокировать</Button> 
                : <Button type="primary">Разблокировать</Button>}
                
            </div>
        </div>
    );
};