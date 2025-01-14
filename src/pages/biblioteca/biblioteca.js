import React, { useState, useEffect } from "react";
import "./biblioteca.css";

// Função principal para chamar todos os componentes
function Biblioteca() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const contentItems = [
    {
      category: "introducao",
      videoId: "J2BKd5e15Jc",
      title: "Introdução aos Corais",
      text: "Os corais são animais fascinantes que formam a base de um dos ecossistemas mais diversos do planeta. Neste vídeo, aprenda sobre sua biologia básica e importância.",
    },
    {
      category: "importancia",
      videoId: "ZiULxLLP32s",
      title: "A Importância dos Recifes de Coral",
      text: "Descubra por que os recifes de coral são considerados um dos ecossistemas mais importantes do planeta e como eles beneficiam tanto a vida marinha quanto os seres humanos.",
    },
    {
      category: "problemas",
      videoId: "fA6mpexcyN4",
      title: "Ameaças aos Corais",
      text: "Conheça os principais problemas que ameaçam os recifes de coral em todo o mundo e como essas ameaças impactam o ecossistema marinho.",
    },
  ];

  const filterContent = () => {
    if (activeCategory === "all") return contentItems;
    return contentItems.filter((item) => item.category === activeCategory);
  };

  const searchContent = () => {
    return filterContent().filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const interval = setInterval(() => createBubble(), 2000);
    return () => clearInterval(interval);
  }, []);

  const createBubble = () => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animation = `bubble-float ${Math.random() * 5 + 5}s linear infinite`;
    document.body.appendChild(bubble);

    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
  };

  return (
    <div className="main-container">
      <Header title="Biblioteca Coral Guard" />
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <FilterButtons
        activeCategory={activeCategory}
        onSelectCategory={(category) => setActiveCategory(category)}
      />
      <CategoryDescriptions activeCategory={activeCategory} />
      <ContentGrid contentItems={searchContent()} />
    </div>
  );
}

// Componentes individuais
const Header = ({ title }) => {
  return (
    <header>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        id="searchInput"
        placeholder="Pesquisar na biblioteca..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

const FilterButtons = ({ activeCategory, onSelectCategory }) => {
  const categories = [
    { label: "Todos", value: "all" },
    { label: "Introdução aos Corais", value: "introducao" },
    { label: "Importância dos Recifes", value: "importancia" },
    { label: "Problemas que Afetam os Corais", value: "problemas" },
    { label: "Mudanças Climáticas", value: "mudancas" },
    { label: "Soluções e Conservação", value: "solucoes" },
    { label: "Como Turistas Podem Ajudar", value: "turistas" },
    { label: "Recursos e Atividades", value: "recursos" },
  ];

  return (
    <div className="filter-container">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`filter-btn ${
            activeCategory === category.value ? "active" : ""
          }`}
          onClick={() => onSelectCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

const CategoryDescriptions = ({ activeCategory }) => {
  const categoryDescriptions = {
    introducao: {
      title: "Introdução aos Corais",
      text: "Os corais são animais marinhos fundamentais para a vida oceânica.",
    },
    importancia: {
      title: "Importância dos Recifes",
      text: "Os recifes de coral abrigam 25% da vida marinha.",
    },
    problemas: {
      title: "Problemas que Afetam os Corais",
      text: "Poluição, aquecimento global e pesca predatória ameaçam os corais.",
    },
    mudancas: {
      title: "Mudanças Climáticas",
      text: "A acidificação dos oceanos impacta os corais.",
    },
    solucoes: {
      title: "Soluções e Conservação",
      text: "Descubra formas de preservar os recifes de coral.",
    },
    turistas: {
      title: "Como Turistas Podem Ajudar",
      text: "Dicas para um turismo sustentável nos recifes.",
    },
    recursos: {
      title: "Recursos e Atividades",
      text: "Materiais educativos e atividades interativas.",
    },
  };

  // Se a categoria ativa for "all" ou não existir no map, não exibe nada
  if (activeCategory === "all" || !categoryDescriptions[activeCategory]) {
    return null;
  }

  // Desestruturação para pegar título e texto da categoria ativa
  const { title, text } = categoryDescriptions[activeCategory];

  return (
    <div className="category-description">
      <h2 className="category-title">{title}</h2>
      <p className="category-text">{text}</p>
    </div>
  );
};

const ContentGrid = ({ contentItems }) => {
  return (
    <div className="content-grid">
      {contentItems.map((item, index) => (
        <div key={index} className="content-item">
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${item.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="text-content">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Biblioteca;