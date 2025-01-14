import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import logo from "../../assents/logo.svg";
import bookIcon from "../../assents/book.png";
import addIcon from "../../assents/adicionar.png";
import profileIcon from "../../assents/profile.png";
import { db } from "../../firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export function Inicio({ usuario }) {
  const [usuarioLocal, setUsuarioLocal] = useState({ name: "" });
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Remove o nome do usuário do localStorage
    navigate('/'); // Redireciona para a tela inicial
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Recupera o usuário local
    if (usuario && usuario.name) {
      setUsuarioLocal({ name: usuario.name });
      localStorage.setItem("usuarioNome", usuario.name); // Armazena o nome no localStorage
    } else {
      const nomeUsuario = localStorage.getItem("usuarioNome");
      if (nomeUsuario) {
        setUsuarioLocal({ name: nomeUsuario });
      }
    }

    // Busca posts do Firestore
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "coralRecords");
        const snapshot = await getDocs(postsCollection);
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [usuario]);

  const nomeUsuario = usuarioLocal.name || "Visitante"; // Nome padrão caso não encontrado

  return (
    <div className="home-body">
      <header className="header-home">
        <div className="container-home">
          <div className="logo-home">
            <img src={logo} alt="Logo Coral Guard" className="src-home" />
            <p className="tag-home">Coral Guard</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
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
          <p className="text-map">
            O site ainda está em desenvolvimento. Algumas imagens podem não
            carregar corretamente, mas estamos trabalhando para resolver isso o
            mais rápido possível. Obrigado pela compreensão! 😊
          </p>
        </div>
      </section>

      <div className="line-home"></div>

      {/* Exibindo os posts do banco de dados */}
      <section className="posts-section">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.date}</h3>
              <p>
                <strong>Localização:</strong> {post.location}
              </p>
              <p>
                <strong>Ponto de Referência:</strong> {post.reference}
              </p>
              <p>
                <strong>Temperatura:</strong> {post.temperature}°C
              </p>
              <p>
                <strong>Estado Físico:</strong> {post.status}
              </p>
              <p>
                <strong>Observações:</strong> {post.observations}
              </p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Imagem do coral"
                  className="post-image"
                />
              )}
            </div>
          ))
        ) : (
          <p>Não há postagens ainda.</p>
        )}
      </section>

      <footer className="fixed-bar">
        <div
          className="icon-link"
          onClick={() => handleNavigation("/biblioteca")}
          role="button"
          tabIndex={0}
        >
          <img src={bookIcon} alt="Biblioteca" className="home-img" />
        </div>

        <div
          className="circle-button"
          onClick={() => handleNavigation("/post")}
          role="button"
          tabIndex={0}
        >
          <img src={addIcon} alt="Fazer uma postagem" className="home-add" />
        </div>

        <div
          className="icon-link"
          onClick={() => handleNavigation("/pagina3")}
          role="button"
          tabIndex={0}
        >
          <img src={profileIcon} alt="Perfil" className="home-img" />
        </div>
      </footer>
    </div>
  );
}

export default Inicio;
