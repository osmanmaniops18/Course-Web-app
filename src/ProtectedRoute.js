import React from 'react';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAutenticated, redirect = '/login', children }) => {

    return isAutenticated ? children : <Navigate to={redirect}/>
 

};

export default ProtectedRoute;

