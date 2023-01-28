import React from 'react';
import Style from './button.module.css';

export const Button = ({handleClick, children, type}) => {
  return (
    <>
        <button className={`${Style['button']} ${Style[type]}`} onClick={handleClick}>
            {children}
        </button>
    </>
  )
}
