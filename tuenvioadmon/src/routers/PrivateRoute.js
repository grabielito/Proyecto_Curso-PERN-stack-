import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';


const PrivateRoute = ({children}) => {
    const { user }= useContext(AuthContext);
  return user.logged ? children : <Navigate to='/'/>
}

export default PrivateRoute