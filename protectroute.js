import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));

    // Verifica se há um usuário autenticado
    if (!storedUser) {
        return <Navigate to="/login" replace />;
    }

    // Verifica se o tipo de usuário tem permissão para acessar
    if (requiredRole && storedUser.tipo !== requiredRole) {
        return <Navigate to="/inicio" replace />;
    }

    return children;
};

export default ProtectedRoute;
