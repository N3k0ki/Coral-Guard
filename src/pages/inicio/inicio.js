import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import logo from "../../assents/logo.svg";
import profileIcon from "../../assents/profile.png";
import opcoes from "../../assents/opcoes.png";
import { db } from "../../firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import menuIcon from "../../assents/cardapio.png"; // Renomeado para evitar conflito de nome

export function Inicio({ usuario }) {
  const [usuarioLocal, setUsuarioLocal] = useState({ name: "" });
  const [posts, setPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (usuario && usuario.name) {
      setUsuarioLocal({ name: usuario.name });
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      const usuarioSalvo = localStorage.getItem("usuario");
      if (usuarioSalvo) {
        const usuarioObjeto = JSON.parse(usuarioSalvo);
        setUsuarioLocal({ name: usuarioObjeto.name || "Visitante" });
      }
    }

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "coralRecords");
        const snapshot = await getDocs(postsCollection);
        const postsList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.estado === "deferida");

        setPosts(postsList);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [usuario]);

  const nomeUsuario = usuarioLocal.name || "Visitante";

  return (
    <body>
      <header>
        <div className="container_nav">
          <div
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)} // Alterna o menu
          >
            <img src={menuIcon} alt="Abrir menu" />
          </div>

          <nav
            className="menu"
            style={{ left: menuOpen ? "0px" : "-250px", transition: "left 0.3s" }}
          >
            <ul>
              <li>
                <p className="lista" onClick={() => handleNavigation("/")}>Introdução</p>
              </li>
              <li>
                <p className="lista" onClick={() => handleNavigation("/biblioteca")}>Biblioteca</p>
              </li>
              <li>
                <p className="lista" onClick={() => handleNavigation("/private")}>Acesso Restrito</p>
              </li>
              <li>
                <p className="lista" onClick={handleLogout}>Sair</p>
              </li>
            </ul>
          </nav>
          <p className="warn">O Coral Guard está em desenvolvimento! 🌊🐠 Em breve, teremos mais recursos para ajudar na preservação dos recifes de coral. Fique atento para novidades e junte-se a nós nessa missão! 💙</p>
          <div className="logo-container">
            <img className="logo_start" src={logo} alt="logo coral guard" />
          </div>
        </div>
        <div className="line_white"></div>
      </header>
      <section className="centered-container">
        <div className="centered-container__item centered-container__item--bold">
          <p className="text-home">
            <strong className="text-bold">Bem-vindo(a), {nomeUsuario}!</strong>
          </p>
        </div>
        <section className="container_post">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="head_post">
                  <div className="post_img">
                    <img className="profile" src={profileIcon} alt="perfil do usuário" />
                    <p className="post_user">Usuário</p>
                  </div>
                  <div className="more_post">
                    <img className="points" src={opcoes} alt="menu" />
                  </div>
                </div>
                <div className="line_white"></div>
                <div className="info_post">
                  <div className="flex_post">
                    <p className="text_post">Data: {post.date}</p> 
                  </div>
                  <div className="flex_post">
                    <p className="text_post">Localização: {post.location}</p> 
                  </div>
                  <div className="flex_post">
                    <p className="text_post">Estado Físico: {post.status}</p> 
                  </div>
                  <div className="flex_post">
                    <p className="text_post">Temperatura: {post.temperature}°C</p> 
                  </div>
                  <div className="flex_post">
                    <p className="text_post">Ponto de referência: {post.reference}</p> 
                  </div>
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="Imagem do coral" className="post-image" />
                  )}
                  <p className="obs_post">• Observações</p>
                  <div className="obs">
                    <p className="text_post">{post.observations}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Não há postagens ainda.</p>
          )}
        </section>
      </section>
    </body>
  );
}

export default Inicio;
