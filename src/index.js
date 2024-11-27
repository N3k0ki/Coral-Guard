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
                    return (
                        <Route
                            key={route.path} 
                            path={route.path}
                            element={React.cloneElement(route.element, { usuario, setUsuario })}
                        />
                    );
                })}
            </Routes>
        </HashRouter>
    );
}

root.render(<Main />);
