import React from 'react';
import Style from './card.module.css';

const Card = ({product}) => {
  return (
    <div className={Style['card__container']}>
      <div className={Style['card__image']}>
        <img src={product.image} alt={product.name}/>
      </div>
      <div className={Style['card__content']}>
        <p className={Style['card__name']}>{product.name}</p>
        <p className={Style['card__price']}>${product.price}</p>
      </div>
    </div>
  )
}

export default Card