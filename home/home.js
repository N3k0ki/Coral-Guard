import React, { useEffect, useState, useRef } from 'react';
import './home.css';

// Importing images
import logo from '../../assents/logo.svg';
import coral1 from '../../assents/coral1.png';
import coral2 from '../../assents/coral2.png';
import coral3 from '../../assents/coral3.png';
import coral4 from '../../assents/coral4.png';
import coral5 from '../../assents/coral5.png';
import coral6 from '../../assents/coral6.png';
import coralImage from '../../assents/coral.png';
import diverImage from '../../assents/mergulhador.png';
import facebookIcon from '../../assents/facebook.png';
import instagramIcon from '../../assents/instagram.png';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export function Home() {
    const [hidden, setHide] = useState(true);
    const carrosselRef = useRef(null); // Reference to carrossel container

    const navigate = useNavigate()



    useEffect(() => {
        // Timer to control visibility of blocks
        const timer = setTimeout(() => setHide(false), 1000);
        return () => clearTimeout(timer);


    }, []);

    // Carrossel Effect
    useEffect(() => {
        const imgs = carrosselRef.current;
        const imgElements = imgs.querySelectorAll('img');
        let idx = 0;

        function carrossel() {
            idx = (idx + 1) % imgElements.length;
            imgs.style.transform = `translateX(${-idx * 100}%)`;
        }

        const interval = setInterval(carrossel, 1800);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // IntersectionObserver for fade-in blocks
    useEffect(() => {
        const blocks = document.querySelectorAll('.block');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    } else {
                        entry.target.classList.remove('show');
                    }
                });
            },
            { threshold: 0.1 }
        );

        blocks.forEach((block) => observer.observe(block));

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    return (
        <div className="classes">
            <header>
                <div className="container">
                    <div className="logo_container">
                        <img className="src_logo" src={logo} alt="Logo Coral Guard" />
                        <p className="tag_logo">Coral Guard</p>
                    </div>
                    <div className="links_container">
                        <p className="login" onClick={async () => {
                            navigate('/login')
                        }}>Login</p>
                        <p className="create" onClick={() => navigate('/register')}>Criar Conta</p>
                    </div>
                </div>
            </header>

            <main>
                <section className="container_home">
                    <div className="container_page">
                        <p className="title">Você pode ajudar a salvar os oceanos!</p>
                    </div>
                    <div className="carrossel">
                        <div className="container_carrossel" id="img" ref={carrosselRef}>
                            <img className="src_img" src={coral1} alt="Coral 1" />
                            <img className="src_img" src={coral2} alt="Coral 2" />
                            <img className="src_img" src={coral3} alt="Coral 3" />
                            <img className="src_img" src={coral4} alt="Coral 4" />
                            <img className="src_img" src={coral5} alt="Coral 5" />
                            <img className="src_img" src={coral6} alt="Coral 6" />
                        </div>
                    </div>
                    <div className="container_page">
                        <p className="subtitle">Cuidar dos corais é proteger a essência vibrante dos oceanos</p>
                    </div>
                </section>

                <section className="container_block">
                    <div className="txt_block">
                        <div className={`block ${hidden ? 'hidden' : ''}`}>
                            <p className="question_title">O que são corais?</p>
                            <p className="txt">
                                Os corais são organismos coloniais marinhos que se fixam em um local e são formados por centenas de pequenos animais chamados pólipos.
                            </p>
                        </div>
                    </div>

                    <div className="txt_block">
                        <div className={`block ${hidden ? 'hidden' : ''}`}>
                            <p className="question_title">Problema</p>
                            <p className="txt">
                                O mapeamento de corais é fundamental para a conservação dos recifes, mas enfrenta desafios técnicos e ambientais.
                            </p>
                            <img className="coral" src={coralImage} alt="Imagem de coral" />
                        </div>
                    </div>

                    <div className="txt_block">
                        <div className={`block ${hidden ? 'hidden' : ''}`}>
                            <p className="question_title">Solução</p>
                            <p className="txt">
                                Aplicativos para mergulhadores e a conscientização da população são essenciais para a preservação dos corais.
                            </p>
                            <img className="mergulhador" src={diverImage} alt="Imagem de mergulhador" />
                        </div>
                    </div>

                    <div className="txt_block">
                        <div className={`block ${hidden ? 'hidden' : ''}`}>
                            <p className="question_title">Conscientização</p>
                            <p className="txt">
                                Use o <span className="highlight">Coral Guard</span> para registrar a saúde dos corais e garantir a preservação para futuras gerações.
                            </p>
                        </div>
                    </div>

                    <p className="txt_final">Há muito o que explorar com o Coral Guard!</p>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-col logo-section">
                        <div className="logo_container">
                            <img className="src_logo" src={logo} alt="Logo Coral Guard" />
                            <p className="tag_logo">Coral Guard</p>
                        </div>
                        <div className="footer-info">
                            <p className="text-footer">Empresa</p>
                            <a  >Dna Bots</a>
                            <p className="text-footer">Política</p>
                            <a  >Termos de Privacidade</a>
                            <p className="text-footer">Suporte</p>
                            <a  >Ajuda</a>
                            <a  >Feedback</a>
                        </div>
                    </div>

                    <div className="footer-col contact-section">
                        <div className="footer-links">
                            <a href="https://www.facebook.com" className="footer-link">
                                <img src={facebookIcon} alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com" className="footer-link">
                                <img src={instagramIcon} alt="Instagram" />
                            </a>
                        </div>
                        <a   className="contact-btn">Contato</a>
                        <p className="copyright">© 2024 Coral Guard</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
