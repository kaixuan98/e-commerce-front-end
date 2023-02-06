import React, {useState} from 'react'
import { Button } from '../components/Button'
import Style from '../styles/admin.module.css';
import FormStyle from '../styles/login.module.css';
import { useAuth } from '../hooks/AuthProvider';

const Admin = () => {   
    const {token, onLogout, onAllLogout} = useAuth();

    const [form,setForm] = useState({
        name:'',
        description: '',
        humidity: '',
        sunlight: '',
        category: '',
        price: 0,
    });

    const [imageFile, setImageFile] = useState(null);

    const [category, setCategory] = useState('housePlants')

    // handle change for form text
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        })
    }
    
    // handle change for images upload
    const handleUpload = (e) => {
        setImageFile(e.target.files[0]);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value); 
    }

    // when submit, need to send in form data
    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('humidity', form.humidity);
        formData.append('sunlight', form.sunlight);
        formData.append('category', category);
        formData.append('price', form.price);
        formData.append('image', imageFile);
        
        fetch('http://localhost:8080/items/create', {
            method: 'POST', 
            mode: 'cors', 
            body: formData,
            headers: { 
                "Authorization": "Bearer "+ token,
            }
        })
        .then( res => res.json() )
        .then( data => {
            alert(data.message);
            
        });
    }
    
    return (
        <div className={Style['page-content']}>
            <div className={Style['profile-section__container']}>
                <h2>Profile Setting</h2>
                <div className={Style['profile-section__btn-container']}>
                    <Button handleClick={onLogout}>Logout</Button>
                    <Button handleClick={onAllLogout}>Logout All</Button>
                </div>
            </div>

            <div className={Style['product-section__container']}>
                <h2>Product Upload Page</h2>
                <div className={Style['product-section__form']}>
                    <div className={Style['form__wrapper']}>
                        <form onSubmit={e => handleSubmit(e)} className={FormStyle['form']}>
                            <div className={FormStyle['form-input__container']}>
                                <label htmlFor='name'>Name</label>
                                <input id="name" type="text" onChange={handleChange}></input>
                            </div>

                            <div className={FormStyle['form-input__container']}>
                                <label htmlFor='description'>Description</label>
                                <textarea id="description" onChange={handleChange}></textarea>
                            </div>

                            <div className={FormStyle['form-input__container']}>
                                <label htmlFor='humidity'>Humidity</label>
                                <textarea id="humidity" onChange={handleChange}></textarea>
                            </div>

                            <div className={FormStyle['form-input__container']}>
                                <label htmlFor='sunlight'>Sunlight</label>
                                <textarea id="sunlight" onChange={handleChange}></textarea>
                            </div>

                            <div className={`${FormStyle['form-input__container']}`}>
                                <p>Categories</p>
                                <div className={`${FormStyle['form-input__container']} ${FormStyle['form-input__container--row']}`}>
                                    <input id="housePlant" type="radio" value="housePlants" onChange={handleCategory} checked={category === 'housePlants'}></input>
                                    <label htmlFor='housePlant'>House Plant</label>
                                    <input id="succulents" type="radio" value="succulents" onChange={handleCategory} checked={category === 'succulents'}></input>
                                    <label htmlFor='succulents'>Succulents & Cactus</label>
                                    <input id="tools" type="radio" value="tools" onChange={handleCategory} checked={category === 'tools'}></input>
                                    <label htmlFor='tools'>Tools</label>
                                </div>
                            </div>

                            <div className={FormStyle['form-input__container']}>
                                <label htmlFor='price'>Price</label>
                                <input id='price' type="number" onChange={handleChange}></input>
                            </div>

                            <div className={FormStyle['form-button__wrapper']}>
                                <input type="file" id="image" name="filename" onChange={handleUpload}/>
                                {/* Preview Image <image ></image> */}
                            </div>

                            <div className={FormStyle['form-button__wrapper']}>
                                <input type="submit"></input>
                            </div>
                        </form>
                    </div>
                    <div className={Style['product-section__preview']}>
                        <image src={imageFile}></image>
                        <p>Name: {form.name}</p>
                        <p>Description: {form.description}</p>
                        <p>Humidity: {form.humidity}</p>
                        <p>Sunlight: {form.sunlight}</p>
                        <p>Category: {category}</p> 
                        <p>Price: {form.price}</p>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Admin