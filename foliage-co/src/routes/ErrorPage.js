import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <div>
            <h3>{error.status} Error</h3>
            <p>{error.statusText}</p>
        </div>
    )
}

export default ErrorPage