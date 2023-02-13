import React from 'react';
import Style from '../Card/orderCard.module.css';

const OrderCard = ({order}) => {

    return (
        <>
            <div className={Style['order-card__container']}>
                <p>{new Intl.DateTimeFormat('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                    }).format(new Date(order.createdAt))}</p>
                <p>Total Items: { order.items.reduce(function (acc, obj) { return acc + obj.quantity; }, 0)}</p>
                <p>${order.bill}</p> 
            </div>
            <hr></hr>
        </>
    )
}

export default OrderCard