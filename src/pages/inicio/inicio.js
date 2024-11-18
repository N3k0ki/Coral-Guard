import React, { useEffect, useState } from 'react'; // Importando useState e useEffect
import { Link } from 'react-router-dom';
import './inicio.css';
import logo from '../../assents/logo.svg';
import bookIcon from '../../assents/book.png';
import addIcon from '../../assents/adicionar.png';
import profileIcon from '../../assents/profile.png';

export function Inicio({ usuario }) {
    const [usuarioLocal, setUsuarioLocal] = useState({ name: '' });

    useEffect(() => {
        // Caso o usuario prop esteja vazio, buscamos no localStorage
        if (usuario && usuario.name) {
            setUsuarioLocal({ name: usuario.name });
            localStorage.setItem('usuarioNome', usuario.name); // Armazenar o nome no localStorage
        } else {
            const nomeUsuario = localStorage.getItem('usuarioNome');
            if (nomeUsuario) {
                setUsuarioLocal({ name: nomeUsuario });
            }
        }
    }, [usuario]); // Esse efeito será disparado sempre que a prop `usuario` mudar

    const nomeUsuario = usuarioLocal.name || 'Visitante'; // Se o nome não for encontrado, exibe 'Visitante'

    return (
        <div className="home-body">
            <header className="header-home">
                <div className="container-home">
                    <div className="logo-home">
                        <img src={logo} alt="Logo Coral Guard" className="src-home" />
                        <p className="tag-home">Coral Guard</p>
                    </div>
                </div>
            </header>

            <div className="line-home"></div>
            <section className="centered-container">
                <div className="centered-container__item centered-container__item--bold">
                    <p className="text-home">
                        <strong>Bem-vindo(a), {nomeUsuario}!</strong>
                    </p>
                </div>
                <div className="centered-container__item centered-container__item--bordered">
                    <p className="text-map">Comece a mapear</p>
                </div>
            </section>

            <div className="line-home"></div>

            <footer className="fixed-bar">
                <Link to="/pagina1" className="icon-link">
                    <img src={bookIcon} alt="Biblioteca" className="home-img" />
                </Link>
                <Link to="/pagina2" className="circle-button">
                    <img src={addIcon} alt="Fazer uma postagem" className="home-add" />
                </Link>
                <Link to="/pagina3" className="icon-link">
                    <img src={profileIcon} alt="Perfil" className="home-img" />
                </Link>
            </footer>
        </div>
    );
}

export default Inicio;
