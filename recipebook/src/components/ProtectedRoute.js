import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('authToken'); // Assume che il token sia salvato in localStorage

    if (!token) {
        return <Navigate to="/login" replace />; // Reindirizza alla pagina di login se non c'è il token
    }

    return element;
};

export default ProtectedRoute;
