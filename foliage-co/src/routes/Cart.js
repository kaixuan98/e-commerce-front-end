import React, {useContext} from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import Loader from '../components/Loader/Loader';
import Style from '../styles/cart.module.css';
import SnackbarContext from '../hooks/SnackBarContext';
import SnackBar from '../components/SnackBar/index'
import BagCard from '../components/Card/BagCard';
import { CartContext } from '../hooks/CartContext';


const Cart = () => {
  const snackbarCtx = useContext(SnackbarContext);
  const {contextValue, isLoading} = useContext(CartContext);  
  
  
  return (
    <>
      <NavBar></NavBar>
      <h1 className={Style['page__title']}>Your Shopping Bag</h1>
      { 
        !isLoading? (
          contextValue.items?.length > 0 ? (
            contextValue.items.map( item => <BagCard key={item.itemId} item={item}/>)
          ):(
            <p>Your Cart is Empty!</p>
          )
        ):(
          <Loader/>
        )
      }
      {snackbarCtx.isDisplayed && <SnackBar/>}
    </>
  )
}

export default Cart