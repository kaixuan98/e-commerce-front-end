import React, {useState} from 'react';
import { Logo } from '../Logo/Logo';
import Styles from '../NavBar/navstyles.module.css';
import { MdOutlinePermIdentity , MdOutlineShoppingBag, MdMenu, MdClose} from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => {

    const [isToggle, setToggle] = useState(false); 

    let linkActiveStyle = {
        color: "#418267",
        textDecoration: "underline",
        textUnderlineOffset:"2px"
    }

    let iconLinkActiveStyle = {
        color: "#fff",
        backgroundColor: "#418267"
    }

    return (
        <header className={Styles['navbar__wrapper']}>
            <div className={Styles['logo__container']}>
                <Link to="/"><Logo/></Link>
            </div>


            <ul className={`${Styles["navbar__list--middle"]} ${isToggle ? Styles["navbar__list--show"] : Styles["navbar__list--hide"]}`}>
                <li>
                    <NavLink 
                        to="/" 
                        className={Styles['navbar__link']}
                        style={({ isActive }) =>
                            isActive ? linkActiveStyle : undefined
                        }
                    >Home</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/shop" 
                        className={Styles['navbar__link']}
                        style={({ isActive }) =>
                            isActive ? linkActiveStyle : undefined
                        }
                    >Shop</NavLink>
                </li>
                {/* <li>
                    <NavLink 
                        to="/blog" 
                        className={Styles['navbar__link']}
                        style={({ isActive }) =>
                            isActive ? linkActiveStyle : undefined
                        }
                        >Blog</NavLink>
                </li> */}
            </ul>


            <ul className={Styles['navbar__list--end']}>
                <li>
                    <NavLink 
                        to="/login"
                        style={({ isActive }) =>
                            isActive ? iconLinkActiveStyle : undefined
                        }
                        >
                        <MdOutlinePermIdentity size={24}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" 
                        style={({ isActive }) =>
                            isActive ? iconLinkActiveStyle : undefined
                        }
                        >
                        <MdOutlineShoppingBag size={24}/>
                    </NavLink>
                </li>
                <li className={Styles['hamburger']} onClick={()=> setToggle(!isToggle)}> {isToggle? <MdClose size={24}/>:<MdMenu size={24}/> } </li>
            </ul>
        </header>
    )
}
