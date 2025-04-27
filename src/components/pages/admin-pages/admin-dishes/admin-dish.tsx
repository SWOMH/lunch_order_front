import React, { useEffect, useRef, useState } from "react";
import style from './admin-dish.module.css';
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectAdminAllDishes, selectAllDishes, selectDishesError, selectDishesLoading } from "../../../../store/selectors/dish/dishSelectors";
import { Button, Modal, AutoComplete, Input } from "antd";
import { IDish } from "../../../../types/dish-types";
import { AdminDishCard } from "./admin-dish-card/admin-dish-card";
import DishAddForm from "./admin-dish-add/admin-dish-add";
import { adminGetAllDish } from "../../../../store/slices/dishSlice";
import Loader from "../../../ui/Loader";

export const AdminDishPage = () => {
    const dispatch = useAppDispatch();
    const allDishes = useAppSelector(selectAdminAllDishes);
    const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isLoading = useAppSelector(selectDishesLoading);
    const error = useAppSelector(selectDishesError);

    useEffect(() => {
      dispatch(adminGetAllDish())
    }, [dispatch]);

    useEffect(() => {
      if (searchQuery.trim() === '') {
        setFilteredDishes(allDishes);
      } else {
        const filtered = allDishes.filter(dish => 
          dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDishes(filtered);
      }
    }, [searchQuery, allDishes]);

    const autoCompleteOptions = allDishes
      .map(dish => ({
        value: dish.name,
        label: dish.name,
      }))
      .filter((option, index, self) =>
        index === self.findIndex(o => o.value === option.value)
      );

    const handleSearch = (value: string) => {
      setSearchQuery(value);
    };

    const handleSelect = (value: string) => {
      setSearchQuery(value);
    };

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className={style.error_container}>
          <h2>Ошибка загрузки блюд</h2>
          <p>{typeof error === 'string' ? error : 'Произошла ошибка при загрузке блюд'}</p>
        </div>
      );
    }

    const handleOpenModalClick = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
        <div className={style.admin_dish_page}>          
          <h1 className={style.page_dish_title}>Админ Меню</h1>     
          <Modal 
            title="Редактирование блюда"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={800}
          >
              <DishAddForm 
                onSave={handleCancel} 
                onCancel={handleCancel} 
              />
          </Modal>
          
          <Button className={style.button_add} onClick={handleOpenModalClick}>
            Добавить новое блюдо
          </Button>
          <div className={style.search_container}>
            <AutoComplete
              options={autoCompleteOptions}
              style={{ width: '100%' }}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder="Поиск блюда..."
              filterOption={(inputValue, option) =>
                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            >
              <Input.Search 
                size="large" 
                allowClear 
                enterButton 
              />
            </AutoComplete>
          </div>
          {filteredDishes.length > 0 ? (
            filteredDishes.map(dish => (            
              <AdminDishCard key={dish.id} dish={dish}/>
            ))
          ) : (
            <div className={style.no_results}>
              {searchQuery ? `Блюда по запросу "${searchQuery}" не найдены` : 'Нет доступных блюд'}
            </div>
          )}
        </div>
      )
}