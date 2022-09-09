import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../redux/cart/slice';
import { RooTState, useAppDispatch } from '../../redux/store';

type PizzaBlockProps = {
  imageUrl: string;
  price: number;
  title: string;
  id: string;
  sizes: number[];
  types: number[];
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  imageUrl,
  price,
  title,
  id,
  sizes,
  types,
}) => {
  const [activeSize, setActiveSize] = useState<number>(sizes[0]);
  const [activeType, setActiveType] = useState<number>(0);
  const dispatch = useAppDispatch();
  const itemsPizza = useSelector((state: RooTState) =>
    state.cart.items.filter((obj) => obj.id === id),
  );

  const addedItems = itemsPizza ? itemsPizza.length : 0;
  const onClickSize = (i: number) => {
    setActiveSize(i);
  };
  const onClickType = (i: number) => {
    setActiveType(i);
  };

  const onClickAdd = () => {
    const item = {
      imageUrl,
      price,
      title,
      id,
      sizes: activeSize,
      types: typeName[activeType],
      count: 1,
    };
    dispatch(addItem(item));
  };
  const typeName = ['тонкое', 'традиционное'];

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => {
            return (
              <li
                key={type}
                onClick={() => onClickType(i)}
                className={activeType === i ? 'active' : ''}>
                {typeName[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size: number) => {
            return (
              <li
                key={size}
                onClick={() => onClickSize(size)}
                className={activeSize === size ? 'active' : ''}>
                {size}см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedItems > 0 ? <i>{addedItems}</i> : ''}
        </button>
      </div>
    </div>
  );
};
