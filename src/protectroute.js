import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const storedUser = localStorage.getItem('usuario');

    // Se não houver usuário salvo, redireciona para login
    if (!storedUser) {
        return <Navigate to="/login" replace />;
    }

    const usuario = JSON.parse(storedUser); // Garante que o dado seja convertido corretamente

    // Se a rota exige um papel específico e o usuário não tem esse papel, redireciona para /inicio
    if (requiredRole && usuario.tipo !== requiredRole) {
        return <Navigate to="/inicio" replace />;
    }

    return children;
};

export default ProtectedRoute;