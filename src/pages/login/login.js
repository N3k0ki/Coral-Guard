import React, { useState, useEffect } from 'react';
import '../register/register.css';
import logo from '../../assents/logo.svg';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            const confirmar = window.confirm("Você já está logado. Deseja continuar?");
            if (confirmar) {
                navigate('/inicio');
            }
        }
    }, [navigate]);
    
    const handleLogin = async () => {
        if (!usuario.email || !usuario.senha) {
            alert("Por favor, preencha todos os campos");
            return;
        }
    
        try {
            const referencia = doc(db, 'Usuarios', usuario.email);
            const snapshot = await getDoc(referencia);
    
            if (!snapshot.exists()) {
                alert("Usuário inexistente");
                return;
            }
    
            const usuarioDb = snapshot.data();
    
            if (usuarioDb?.senha !== usuario.senha) {
                alert("Senha incorreta");
                return;
            }
    
            // Armazena corretamente no localStorage
            localStorage.setItem('usuario', JSON.stringify(usuarioDb));
    
            // Redireciona conforme o tipo do usuário
            switch (usuarioDb.tipo || 'cliente') {
                case 'adm':
                    navigate('/admin');
                    break;
                case 'mod':
                    navigate('/mod');
                    break;
                case 'org':
                    navigate('/organizacoes');
                    break;
                default:
                    navigate('/inicio');
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao tentar login. Tente novamente.");
        }
    };

    return (
        <main className='reg-body'>
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
                    <h1 className="welcome_title">Boas-vindas de volta!</h1>
                    <h2 className="welcome_subtitle">Estamos muito animados em te ver novamente!</h2>
                </div>
                <div className="input_section">
                    <label htmlFor="email" style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>e-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        required
                        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                    />
                </div>
                <div className="input_section">
                    <label htmlFor="password" style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        required
                        onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                    />
                </div>
            </section>
            <footer>
                <div className="action_section">
                    <p className="enter_button" onClick={handleLogin}>
                        Entrar
                    </p>
                    <p className="register_prompt">
                        Precisando de uma conta?
                        <span onClick={() => navigate('/register')} className="register_link">
                            Registre-se
                        </span>
                    </p>
                </div>
            </footer>
        </main>
    );
}

export default Login;