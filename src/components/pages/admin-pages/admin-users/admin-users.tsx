import { useEffect } from 'react';
import style from './admin-user.module.css';
import Loader from '../../../ui/Loader';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectAdminErrorLoading, selectAdminIsLoading, selectAllUsers, selectUserInfo } from '../../../../store/selectors/user/userSelectors';
import { getAdminAllUserInfo } from '../../../../store/slices/authSlice';
import { Empty } from 'antd';
import { AdminUserCard } from './admin-user-card/admin-user-card';

export const AdminUsersPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const allUsers = useAppSelector(selectAllUsers);
  const isLoading = useAppSelector(selectAdminIsLoading);
  const errorLoad = useAppSelector(selectAdminErrorLoading);


  useEffect(() => {
    if (user?.telegram_id) { //@ts-ignore
      dispatch(getAdminAllUserInfo(user?.telegram_id))
    }
  }, [dispatch, user?.telegram_id]);
  
  if (isLoading) {
    return <Loader />;
  };
  
  if (errorLoad) {
    return (
      <div className={style.error_container}>
        <h2>Ошибка загрузки пользователей</h2>
        <p>Произошла ошибка при загрузке пользователей, обратитесь к Артуру</p>
      </div>
    );
  };

  if (allUsers.length === 0) {
    return (
      <Empty />
    );
  };

  return (
    <>
      <div className={style.header}>Пользователи</div>
      <div className={style.order_list}>
        {allUsers.map(user => (
          <div className={style.order_item} key={user.id}>
            <AdminUserCard user={user} />
          </div>
        ))}
      </div>
    </>
  );
}; 