import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { NavBar } from '../components/NavBar/NavBar'
import Style from '../styles/shop.module.css';
import Loader from '../components/Loader/Loader'

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const categories = [
    { category: '',
      text: 'All',
      isActive: true
    }, 
    { category: 'housePlants',
      text: 'House Plant',
      isActive: false
    }, 
    { category: 'succulents',
      text: 'Succulents & Cacti',
      isActive: false
    }, 
  ];

  const filterPlants = (category) => {
    if(category === ''){
      setIsLoading(true);
      fetch('http://15.223.3.11:8080/items')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setIsLoading(false);
      });
    }else{
      setIsLoading(true);
      fetch(`http://15.223.3.11:8080/items/${category}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setIsLoading(false);
      });

    }
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchPlants = () => {
      fetch('http://15.223.3.11:8080/items')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setIsLoading(false);
        });
    }
    fetchPlants();
  }, [])


  return (
    <>
      <NavBar/>
          <div className={Style['page__container']}>
            <div className={Style['page__title']}>
              <h2>Explore our plants</h2>
            </div>
            <div className={Style['page__content']}>
              <div className={Style['sideFilter__container']}>
                <ul className={Style['sideFilter__list']}>
                  {
                    categories.map( category => 
                      <li className={Style['sideFilter__list-item']} onClick={ () => filterPlants(category.category)}>{category.text}</li>
                    )
                  }
                </ul>
              </div>
              <hr></hr>
              {
                !isLoading? (
                  <div className={Style['catalog__wrapper']}>
                    <div className={Style['catalog__container']}>
                      <div className={Style['catalog']}>
                        {
                          products.map( plant => <Link to={`/shop/${plant._id}`} key={plant._id}><Card product={plant}/></Link>)
                        }
                      </div>
                    </div>
                  </div>
                ):(
                  <div className={Style['loader__wrapper']}>
                    <Loader/>
                  </div>
                )
              }
            </div>
          </div>
    </>
  )
}

export default Shop