import ReactDOM from "react-dom/client";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'; // Importa useState
import { routes } from "./_routes";
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
    const [usuario, setUsuario] = useState({ name: '', email: '', senha: '' });

    return (
        <HashRouter>
            <Routes>
                {routes.map((route) => {
                    // Passa o estado usuario e a função setUsuario como props
                    return (
                        <Route
                            key={route.path} // Adiciona a chave única
                            path={route.path}
                            // Passa `usuario` e `setUsuario` como props para o componente
                            element={React.cloneElement(route.element, { usuario, setUsuario })}
                        />
                    );
                })}
            </Routes>
        </HashRouter>
    );
}

root.render(<Main />);
