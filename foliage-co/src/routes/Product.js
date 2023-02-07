import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../components/NavBar/NavBar';
import Style from '../styles/product.module.css';
import AccordianStyle from '../components/Accordian/accordian.module.css';
import ButtonStyle from '../components/Button/button.module.css';


const Product = () => {
    let params = useParams(); 

    const [plant, setPlant] = useState({}); 
    const [isActive, setActive] = useState(false); 
    const [quantity, setQuantity] = useState(1);

    const fetchPlant = () => {
        fetch( `http://localhost:8080/items/${params.id}`)
            .then(res => res.json())
            .then(data => setPlant(data));
    }

    const handleClick = () => {
        setActive(!isActive);
    }

    const decreament = () => {
        if(quantity > 1){
            setQuantity(quantity - 1 ); 
        }
    }

    const increament = () => {
        setQuantity(quantity + 1); 
    }

    const addToBag = () => {
        console.log(params.id + ": " + quantity);
    }

    useEffect(() => {
        fetchPlant()
    }, [])
    

    return (
        <>
            <NavBar/>
            <div className={Style['product__page']}>
                <div className={Style['product__image']}>
                    <img alt={plant.name} src={plant.image}></img>
                </div>
                <div className={Style['product__content']}>
                    <h2 className={Style['product__name']}>{plant.name}</h2>
                    <p className={Style['product__descrb']}>{plant.description}</p>
                    <p className={Style['product__price']}>${plant.price}</p>
                    <div className={Style['seperation-line']}></div>
                    <div className={AccordianStyle['accordian__container']}>
                        <div className={AccordianStyle['accordian__title']} onClick={handleClick}>
                            <p>Care Instruction</p>
                            <p>{isActive? '-' : '+'}</p>
                        </div>
                        <div className={`${AccordianStyle[isActive? 'accordian__content--show': 'accordian__content--hide']}`}> 
                            <p className={AccordianStyle['accordian__content-title']}>Humidity</p>
                            <p className={AccordianStyle['accordian__content-paragraph']}>{plant.humidity}</p>
                            <p className={AccordianStyle['accordian__content-title']}>Sunlight</p>
                            <p className={AccordianStyle['accordian__content-paragraph']}>{plant.sunlight}</p>
                        </div>
                    </div>
                    <div className={Style['seperation-line']}></div>
                    <div className={Style['button-group']}>
                        <div className={Style['quantity__container']}>
                            <button onClick={decreament} className={ButtonStyle['button']}>-</button>
                            <p className={Style['quantity']}>{quantity}</p>
                            <button onClick={increament} className={ButtonStyle['button']}>+</button>
                        </div>
                        <button className={ButtonStyle['button']} onClick={addToBag}>Add to Bag</button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default Product