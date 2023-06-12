import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = React.useMemo(() => {
        const token = localStorage.getItem('transport_token')
        return token ? true : false
    }, [])

    return isAuthenticated ? children : <Navigate to='/login' />
} 
  
export default PrivateRoute;