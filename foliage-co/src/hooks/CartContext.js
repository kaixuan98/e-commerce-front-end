import { createContext, useState, useEffect , useContext} from "react";
import { useAuth } from "./AuthProvider";
import SnackbarContext from "./SnackBarContext";

// defining the context is like interface or a shell 
export const CartContext = createContext({
    items: [],
    bill: 0,
    getProductQty: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    addToBag: () => {},
    deleteFromCart : () => {},
    checkOut: () => {}
});

export function CartProvider({children}){

    const {token} = useAuth();
    const snackbarCtx = useContext(SnackbarContext)

    const [cartProducts, setCartProducts] = useState([]); 
    const [bill, setBill] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(token){
            fetch('http://15.223.3.11:8080/cart', {
                method: 'GET', 
                mode: 'cors', 
                headers: { Authorization: "Bearer "+ token}
            })
            .then(res => res.json())
            .then(data => {
                setCartProducts(data.items);
                setBill(data.bill);
                setIsLoading(false);
            })
        }
    }, [token])
    

    // get a single product's quantity
    const getProductQty = (itemId) => {
        const quantity =  cartProducts.find( product => product.itemId === itemId)?.quantity;

        if(quantity === undefined){
            return 0;
        }

        return quantity;
    }

    // add one item to the cart 
    function addOneToCart(itemId){
        let quantity = getProductQty(itemId); 

        fetch("http://15.223.3.11:8080/cart", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                itemId,
                quantity: quantity + 1 , 
            }),
            headers: {
                "Authorization": "Bearer "+ token,
                'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
            setCartProducts(data.items)
            setBill(data.bill);
            setIsLoading(false);
        })
    }

    // add item into bag - needs to trigger snackbar
    function addToBag(itemId, quantity){

        const triggerSnackbar = (msg, type) => {
            snackbarCtx.displayMsg(msg, type);
        }
        fetch("http://15.223.3.11:8080/cart", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                itemId,
                quantity,
            }),
            headers: {
                "Authorization": "Bearer "+ token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    return Promise.reject(res);
            })
            .then(data => {
                setCartProducts(data.items)
                setBill(data.bill);
                setIsLoading(false);
                triggerSnackbar("Added to Bag!","Success");
            })
            .catch(error => {
                if(error.status === 401){
                    error.json().then( () => triggerSnackbar("Please login before adding into shopping bag.", "Error"))
                }else{
                    error.json().then( () => triggerSnackbar("Somthing went wrong.", "Error"))
                }
            })
    }

    function removeOneFromCart(itemId){
        let quantity = getProductQty(itemId); 
        
        if(quantity > 0){
            fetch("http://15.223.3.11:8080/cart", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    itemId,
                    quantity: quantity- 1  , 
                }),
                headers: {
                    "Authorization": "Bearer "+ token,
                    'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                setCartProducts(data.items)
                setBill(data.bill);
                setIsLoading(false);
            })
        }

    }

    function deleteFromCart(itemId) {
        fetch(`http://15.223.3.11:8080/cart/?itemId=${itemId}`, {
                method: 'DELETE', 
                mode: 'cors', 
                headers: { Authorization: "Bearer "+ token}
        })
            .then(res => res.json())
            .then(data => {
                setCartProducts(data.items);
                setBill(data.bill);
                setIsLoading(false);
            })
    }

    function checkOut(){
        fetch('http://15.223.3.11:8080/order/checkout',{
            method: 'POST',
            mode: 'cors',
            headers: {
                "Authorization": "Bearer "+ token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setCartProducts([]);
                setBill(0);
                setIsLoading(false);
            });
    }

    const contextValue = {
        items: cartProducts,
        bill,
        getProductQty,
        addOneToCart,
        removeOneFromCart,
        addToBag,
        deleteFromCart,
        checkOut,
    }

    return (
        <CartContext.Provider value={{ contextValue, isLoading}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;