import React, { FC } from "react";

import style from './admin-user-card.module.css'
import { IAdminUsers } from "../../../../../types/user-types";
import { Button } from "antd";
import { useAppDispatch } from "../../../../../store/hooks";
import { adminEditUserStatus } from "../../../../../store/slices/authSlice";

interface IUserCard {
    user: IAdminUsers;
}

export const AdminUserCard: React.FC<IUserCard> = ({ user }) => {
    const dispatch = useAppDispatch();

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

    const handleClick = () => {
        dispatch(adminEditUserStatus(user.telegram_id))
    };


    return (
      <div className={style.order_card}>
            <div className={style.order_header}>
                <div>
                    <p><span className={style.order_number}>{user.name}</span></p>
                    <span className={style.order_date}>{user.telegram_name ? `Телеграм имя: ${user.telegram_name}` : ''}</span>
                </div>
                <span className={`${style.order_status} ${getStatusClass(user.banned)}`}>
                    {!user.banned ? 'Работает' : 'Заблокирован'}
                </span>
            </div>

            <div className={style.order_total}>
                <span>Действие:</span>
                {!user.banned 
                ? <Button danger onClick={handleClick}>Заблокировать</Button> 
                : <Button type="primary" onClick={handleClick}>Разблокировать</Button>}
                
            </div>
        </div>
    );
};