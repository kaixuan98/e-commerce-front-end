import React, {useContext} from 'react'
import Style from '../Card/bagCard.module.css'
import { CartContext } from '../../hooks/CartContext';
import ButtonStyle from '../Button/button.module.css'

const BagCard = ({item, cart, handleCart}) => {
    const {contextValue, isLoading} = useContext(CartContext);

    const deleteItem = (itemId) => {
        contextValue.deleteFromCart(itemId)
    }




    return (
        <>
            <div className={Style['bag-card__container']}>

                <div className={Style['bag-card__image-container']}>
                </div>

                <div className={Style['bag-card__product-details']}>
                    <div className={Style['bag-card__product']}>
                        <p className={Style['product__text--primary']}>{item.name}</p>
                        <p className={Style['product__text--secondary']}>${item.price * item.quantity}</p>
                    </div>

                    <div className={Style['bag-card__quantity']}>
                        <button className={ButtonStyle['button']} onClick={() => contextValue.removeOneFromCart(item.itemId)}> - </button>
                        <p className={Style['product__text--secondary']} >{item.quantity}</p>
                        <button className={ButtonStyle['button']} onClick={() => contextValue.addOneToCart(item.itemId)}> + </button> 
                    </div>

                    <div className={Style['bag-card__remove-container']} onClick={() => deleteItem(item.itemId)}>&times;</div>
                </div>
            </div>
            <hr></hr>
        </>
    )
}

export default BagCard