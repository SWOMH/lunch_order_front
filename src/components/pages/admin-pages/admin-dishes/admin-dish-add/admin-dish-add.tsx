import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Switch, Select, Divider, message } from "antd";
import { IDish, IVariants } from "../../../../../types/dish-types";
import { useAppDispatch } from "../../../../../store/hooks";
import { addDish } from "../../../../../store/slices/dishSlice";

const { TextArea } = Input;
const { Option } = Select;

interface DishAddFormProps {
  onSave: (dish: IDish) => void;
  onCancel: () => void;
}

const DishAddForm: React.FC<DishAddFormProps> = ({ onSave, onCancel }) => { // Да, это дублирование кода, но пока оставлю так
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [variants, setVariants] = useState<IVariants[]>([]);
  const [currentVariant, setCurrentVariant] = useState<Partial<IVariants>>({ size: '', price: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddVariant = () => {
    if (currentVariant.size && currentVariant.price !== undefined) {
      const newVariant = {
        id: Date.now(), // временный id
        size: currentVariant.size,
        price: currentVariant.price
      };
      setVariants([...variants, newVariant]);
      setCurrentVariant({ size: '', price: 0 });
    }
  };

  const handleRemoveVariant = (id: number) => {
    setVariants(variants.filter(v => v.id !== id));
   };

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    
    try {
        const hasVariants = variants.length > 0;
        const dishData = {
            dish_name: values.name,
            description: values.description || '',
            price: hasVariants ? null : (values.price === '' ? null : values.price),
            available: values.available,
            image: values.image || 'https://cdn.arora.pro/a/upload/7fd79306-b3c8-4bdc-9a68-2521e0a9a65f/file_manager/theme/theme-pizzapub/no-photo-standart.jpg?webp',
            type: values.type,
            stop_list: values.stop_list,
            is_combo: values.is_combo,
            additives: values.additives,
            variants: variants.length > 0 
            ? variants.map(v => ({
                dish_id: 0,
                size: v.size,
                price: v.price
                }))
            : [] 
        };
    
        const resultAction = await dispatch(addDish(dishData));
    
        if (addDish.fulfilled.match(resultAction)) {
            message.success('Блюдо успешно добавлено');
            onSave(resultAction.payload);
        }
        } catch (error) {
            message.error('Ошибка при добавлении блюда');
            console.error('Ошибка при сохранении:', error);
            } finally {
            setIsSubmitting(false);
            }
    };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Название блюда"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Цена (если нет вариантов)"
        name="price"
        normalize={(value) => value === '' ? null : value}
        extra="Оставьте поле пустым, если у блюда есть варианты с ценами"
      >
        <InputNumber 
          style={{ width: '100%' }} 
          disabled={variants.length > 0}
          onChange={(value) => {
            if (value === null || value === undefined) {
              form.setFieldsValue({ price: '' });
            }
          }}
        />
      </Form.Item>

      <Form.Item
        label="Изображение"
        name="image"
        rules={[{ required: false, message: 'Пожалуйста, укажите ссылку на изображение' }]}
        extra="Пожалуйста, укажите ссылку на изображение"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Тип блюда"
        name="type"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип' }]}
      >
        <Select>
          <Option value="Соус">Соус</Option>
          <Option value="Закуски">Закуски</Option>
          <Option value="Лапша/паста">Лапша/паста</Option>
          <Option value="Основные блюда">Основные блюда</Option>
          <Option value="Гарниры">Гарниры</Option>
          <Option value="Первые блюда">Первые блюда</Option>
          <Option value="Салаты">Салаты</Option>
          <Option value="Римские пиццы">Римские пиццы</Option>
          <Option value="Пицца">Пицца</Option>
          <Option value="Роллы горячие">Роллы горячие</Option>
          <Option value="Роллы холодные">Роллы холодные</Option>
          <Option value="Сет">Сет</Option>
          <Option value="Десерты">Десерты</Option>
          <Option value="Завтраки">Завтраки</Option>
          <Option value="Добавки">Добавки</Option>
          <Option value="Фитнес меню">Фитнес меню</Option>
          <Option value="Зимнее меню">Зимнее меню</Option>
          <Option value="Напитки">Напитки</Option>
          <Option value="Бизнес-ланчи">Бизнес-ланчи</Option>
          <Option value="Детское меню">Детское меню</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Доступно для заказа"
        name="available"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="В стоп-листе"
        name="stop_list"
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Есть добавки"
        name="additives"
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>

      <Divider orientation="left">Варианты блюда</Divider>
      
      <div style={{ marginBottom: 16 }}>
        <Input.Group compact>
          <Input
            style={{ width: '60%' }}
            placeholder="Размер (например: 300 мл)"
            value={currentVariant.size}
            onChange={(e) => setCurrentVariant({...currentVariant, size: e.target.value})}
          />
          <InputNumber
            style={{ width: '40%' }}
            placeholder="Цена"
            min={0}
            value={currentVariant.price}
            onChange={(value) => setCurrentVariant({...currentVariant, price: value || 0})}
          />
          <Button
            type="primary"
            onClick={handleAddVariant}
          >
            Добавить
          </Button>
        </Input.Group>
      </div>

      {variants.map(variant => (
        <div key={variant.id} style={{ display: 'flex', marginBottom: 8 }}>
          <Input
            style={{ marginRight: 8, flex: 1 }}
            value={variant.size}
            readOnly
          />
          <InputNumber
            style={{ marginRight: 8, flex: 1 }}
            value={variant.price}
            readOnly
          />
          <Button
            danger
            onClick={() => handleRemoveVariant(variant.id)}
          >
            Удалить
          </Button>
        </div>
      ))}

      <Form.Item style={{ marginTop: 24 }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ marginRight: 8 }}
          loading={isSubmitting}
        >
          Добавить блюдо
        </Button>
        <Button onClick={onCancel} disabled={isSubmitting}>
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DishAddForm;