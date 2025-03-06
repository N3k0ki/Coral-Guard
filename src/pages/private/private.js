import React from "react";
import { useNavigate } from "react-router-dom";
import "./private.css"

function RestrictedAccess () {
    const navigate = useNavigate();

    return (
      <div className="container">
        <div className="header">
          <button onClick={() => navigate(-1)} className="x">X</button>
        </div>
        <img src="./src/assents/logo.svg" alt="Logo" className="logo" />
        <div className="title">Acesso restrito:</div>
        <div className="container">
          <div className="card">
            <h2>ORG</h2>
            <button onClick={() => navigate("/private")} className="link">Em andamento</button>
            <div className="line-white"></div>
            <h2>MODERAÇÃO</h2>
            <button onClick={() => navigate("/mod")} className="link">Análises de Post</button>
            <div className="line-white"></div>
            <h2>ADMINISTRAÇÃO</h2>
            <button onClick={() => navigate("/adm")} className="link">Gerenciar usuários</button>
          </div>
        </div>
      </div>
  );
};

export default RestrictedAccess;
