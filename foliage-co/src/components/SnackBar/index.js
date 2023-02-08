import React, {useContext} from 'react';
import SnackbarContext from '../../hooks/SnackBarContext';
import Style from '../SnackBar/snackBar.module.css';
import {createPortal} from 'react-dom';

const SnackBar = () => {
  const snackbarCtx = useContext(SnackbarContext);
  let snackbarType = "snackbar__container--" + snackbarCtx.type; 

  return createPortal(
    <div className={`${Style['snackbar__container']} ${Style[snackbarType]}`}>
        <div className={Style['snackbar__label']}>{snackbarCtx.msg}</div>
        <div className={Style['snackbar__dismiss']} onClick={snackbarCtx.onClose}>&times;</div>
    </div>,
    document.getElementById("snackbar__root")
  )
}

export default SnackBar