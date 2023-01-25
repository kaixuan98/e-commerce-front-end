import React from 'react';
import '../../font.css'
import Styles from '../Logo/logo.module.css';

export const Logo = () => {
    return (
        <div className={Styles["logo__wrapper"]}>
            <p className={Styles["logo__word--black"]}>Foliage</p>
            <p className={Styles["logo__word--green"]}>+</p>
            <p className={Styles["logo__word--black"]}>Co.</p>
        </div>
    )
}
