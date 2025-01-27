import React, { useEffect, useState } from 'react';
import { db } from "../../firebase/firebase.js"; // Importando a configuração do Firebase
import { getDocs, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import './mod.css'; // Importa o CSS necessário

const Mod = () => {
  const [postList, setPostList] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [filter, setFilter] = useState('todos');

  // Buscar posts no Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coralRecords"));
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          status: "em análise",
          ...doc.data(),
        }));
        setPostList(posts);
      } catch (error) {
        console.error("Erro ao buscar dados de corais:", error);
      }
    };

    fetchPosts();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const postRef = doc(db, "coralRecords", id);
      await updateDoc(postRef, { status: newStatus });

      const updatedPosts = postList.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      );
      setPostList(updatedPosts);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const deletePost = async (id, justification) => {
    try {
      const postRef = doc(db, "coralRecords", id);
      await deleteDoc(postRef);

      const updatedPosts = postList.filter((post) => post.id !== id);
      setPostList(updatedPosts);
      closeJustificationModal();
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  const showJustificationModal = (reportId) => {
    setSelectedReportId(reportId);
  };

  const closeJustificationModal = () => {
    setSelectedReportId(null);
  };

  const submitJustification = () => {
    const justification = document.getElementById('justificationText').value;
    if (!justification.trim()) {
      alert('Por favor, forneça uma justificativa para a exclusão.');
      return;
    }

    if (selectedReportId) {
      deletePost(selectedReportId, justification);
    }
  };

  const filteredPosts =
    filter === 'todos'
      ? postList
      : postList.filter((post) => post.status === filter);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Painel do Administrador</span>
          <span className="text-light">Bem-vindo, Admin</span>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {/* Estatísticas */}
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Estatísticas</h5>
                <p>Total de denúncias: {postList.length}</p>
                <p>
                  Em análise: {postList.filter((post) => post.status === 'em análise').length}
                </p>
                <p>Deferidas: {postList.filter((r) => r.status === 'deferida').length}</p>
                <p>Indeferidas: {postList.filter((post) => post.status === "indeferido").length}</p>
              </div>
            </div>
          </div>

          {/* Lista de denúncias */}
          <div className="col-md-9">
            <div className="mb-4">
              <div className="btn-group" role="group">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setFilter("todos")}
                >
                  Todos
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => setFilter("em análise")}
                >
                  Em Análise
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => setFilter('deferida')}
                >
                  Deferidas
                </button>
              </div>
            </div>

            <div id="reports-container">
              {filteredPosts.length === 0 ? (
                <p>Nenhuma denúncia encontrada.</p>
              ) : (
                filteredPosts.map((post) => (
                  <div className={`card report-card`} key={post.id}>
                    <div className="card-body">
                      <h5 className="card-title">Denúncia #{post.id}</h5>
                      {post.date && <p><strong>Data:</strong> {post.date}</p>}
                      {post.reporter && (
                        <p className="card-text">
                          <strong>Denunciante:</strong> {post.reporter}
                        </p>
                      )}
                      {post.email && (
                        <p className="card-text">
                          <strong>Email:</strong> {post.email}
                        </p>
                      )}
                      {post.location && (
                        <p className="card-text">
                          <strong>Local:</strong> {post.location}
                        </p>
                      )}
                      {post.temperature && (
                        <p className="card-text">
                          <strong>Temperatura:</strong> {post.temperature}°C
                        </p>
                      )}
                      {post.coralCondition && (
                        <p className="card-text">
                          <strong>Estado dos Corais:</strong>{' '}
                          <span className={`coral-condition-${post.coralCondition}`}>
                            {post.coralCondition}
                          </span>
                        </p>
                      )}
                      {post.observations && (
                        <div className="card-text">
                          <strong>Observações:</strong>
                          <div className="border p-2 mt-2 mb-3">{post.observations}</div>
                        </div>
                      )}
                      {post.imageUrl && (
                        <div className="card-text">
                          <strong>Imagem:</strong>
                          <br />
                          <img
                            src={post.imageUrl}
                            className="img-fluid mt-2"
                            alt="Coral"
                          />
                        </div>
                      )}
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateStatus(post.id, 'deferida')}
                      >
                        Deferir
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => showJustificationModal(post.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Justificativa */}
      {selectedReportId && (
        <div id="overlay">
          <div id="justificationModal">
            <h5>Justificativa para exclusão</h5>
            <textarea id="justificationText" className="form-control" rows="3"></textarea>
            <button className="btn btn-danger mt-2" onClick={submitJustification}>
              Confirmar Exclusão
            </button>
            <button className="btn btn-secondary mt-2" onClick={closeJustificationModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mod;
