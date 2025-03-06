import React from "react";
import { useNavigate } from "react-router-dom";
import "./private.css"

function RestrictedAccess () {
    const navigate = useNavigate();

    return (
      <div className="container">
        <div className="header">
          <div onClick={() => navigate(-1)} className="x">X</div>
        </div>
        <div className="title">Acesso restrito:</div>
        <div className="container">
          <div className="card">
            <h2>ORG</h2>
            <div onClick={() => navigate("/private")} className="link">Em andamento</div>
            <div className="line-white"></div>
            <h2>MODERAÇÃO</h2>
            <div onClick={() => navigate("/mod")} className="link">Análises de Post</div>
            <div className="line-white"></div>
            <h2>ADMINISTRAÇÃO</h2>
            <div onClick={() => navigate("/adm")} className="link">Gerenciar usuários</div>
          </div>
        </div>
      </div>
  );
};

export default RestrictedAccess;
