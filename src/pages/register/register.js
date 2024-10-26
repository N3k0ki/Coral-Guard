import React, { useState } from 'react';
import './register.css'; // Arquivo CSS
import logo from '../../assents/logo.svg'; // Importe da logo
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export function Register() {
    const [usuario, setUsuario] = useState({})

    const enviar = async () => {
        if (usuario.name && usuario.email && usuario.senha) {
            const referencia = doc(db, 'Usuarios', usuario.email)
            await setDoc(referencia, usuario)
        }
    }

    const navigate = useNavigate()

    return (
        <div className='reg-body'>
            <main>
                <section className="reg-container_login">
                    <div className="reg-container">
                        <div className="reg-logo_container">
                            <img className="reg-src_logo" src={logo} alt="Logo Coral Guard" />
                            <p className="reg-tag_logo">Coral Guard</p>
                        </div>
                    </div>
                </section>

                <section className="container_block">
                    <div className="welcome_message">
                        <h1 className="welcome_title">Criar Conta</h1>
                    </div>

                    <form id="form-cadastro" onSubmit={(e) => e.preventDefault()}>
                        <div className="input_section">
                            <label htmlFor="user">Usuário:</label>
                            <input type="text" id="user" name="user" placeholder="Crie seu usuário" required
                                onChange={(e) => {
                                    usuario['name'] = e.target.value
                                    setUsuario(usuario)
                                }} />
                        </div>
                        <div className="input_section">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required
                                onChange={(e) => {
                                    usuario['email'] = e.target.value
                                    setUsuario(usuario)
                                }} />
                        </div>
                        <div className="input_section">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required
                                onChange={(e) => {
                                    usuario['senha'] = e.target.value
                                    setUsuario(usuario)
                                }} />
                        </div>
                        <button className="enter_button" type="submit"
                            onClick={() => {
                                enviar();
                                navigate('/')
                            }}
                        >Registre-se</button>
                    </form>
                </section>
            </main>

            <footer>
                <div className="action_section">
                    <p className="register_prompt">
                        Ao se registrar você concorda com os{' '}
                        <Link to="#" className="register_link">termos de serviço</Link> e{' '}
                        <Link to="#" className="register_link">política de privacidade</Link> do Coral Guard
                    </p>
                </div>
            </footer>
        </div>
    );
}
