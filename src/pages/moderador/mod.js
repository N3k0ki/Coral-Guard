import React, { useEffect, useState } from 'react';
import { db } from "../../firebase/firebase.js"; // Importando a configuração do Firebase
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import './mod.css'; // Importa o CSS necessário

const Mod = () => {
  const [currentReports, setCurrentReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [deletedReportsCount, setDeletedReportsCount] = useState(0);
  const [filter, setFilter] = useState('todos');

  // Função para buscar os posts no Firestore
  useEffect(() => {
    const fetchReports = async () => {
      const reportsSnapshot = await getDocs(collection(db, "coralRecords"));
      const reportsData = reportsSnapshot.docs.map(doc => doc.data());
      setCurrentReports(reportsData);
    };

    fetchReports();
  }, []);

  const updateReportsDisplay = (filter) => {
    setFilter(filter);
  };

  const updateStatus = (reportId, newStatus) => {
    setCurrentReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  const showJustificationModal = (reportId) => {
    setSelectedReportId(reportId);
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('justificationModal').style.display = 'block';
  };

  const closeJustificationModal = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('justificationModal').style.display = 'none';
    setSelectedReportId(null);
  };

  const submitJustification = () => {
    const justification = document.getElementById('justificationText').value;
    if (!justification.trim()) {
      alert('Por favor, forneça uma justificativa para a exclusão.');
      return;
    }

    setCurrentReports((prevReports) =>
      prevReports.filter((report) => report.id !== selectedReportId)
    );
    setDeletedReportsCount((prevCount) => prevCount + 1);
    closeJustificationModal();
  };

  const forwardPost = (reportId) => {
    alert(`Post ${reportId} enviado com sucesso!`);
  };

  const filteredReports =
    filter === 'todos'
      ? currentReports
      : currentReports.filter((report) => report.status === filter);

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
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Estatísticas</h5>
                <div className="mt-3">
                  <p>Total de denúncias: {currentReports.length}</p>
                  <p>Em análise: {currentReports.filter((r) => r.status === 'em-analise').length}</p>
                  <p>Deferidas: {currentReports.filter((r) => r.status === 'deferida').length}</p>
                  <p>Excluídas: {deletedReportsCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="mb-4">
              <div className="btn-group" role="group">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => updateReportsDisplay('todos')}
                >
                  Todos
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => updateReportsDisplay('em-analise')}
                >
                  Em Análise
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => updateReportsDisplay('deferida')}
                >
                  Deferidas
                </button>
              </div>
            </div>

            <div id="reports-container">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`card report-card status-${report.status}`}
                >
                  <div className="card-body">
                    <h5 className="card-title">Denúncia #{report.id}</h5>
                    <p className="card-text">
                      <strong>Data:</strong> {report.date}
                    </p>
                    <p className="card-text">
                      <strong>Denunciante:</strong> {report.reporter}
                    </p>
                    <p className="card-text">
                      <strong>Email:</strong> {report.email}
                    </p>
                    <p className="card-text">
                      <strong>Local:</strong> {report.location}
                    </p>
                    <p className="card-text">
                      <strong>Temperatura:</strong> {report.temperature}°C
                    </p>
                    <p className="card-text">
                      <strong>Estado dos Corais:</strong>{' '}
                      <span className={`coral-condition-${report.coralCondition}`}>
                        {report.coralCondition}
                      </span>
                    </p>
                    <div className="card-text">
                      <strong>Observações:</strong>
                      <div className="border p-2 mt-2 mb-3">{report.observations}</div>
                    </div>
                    <div className="card-text">
                      <strong>Imagem:</strong>
                      <br />
                      <img
                        src={report.imageUrl}
                        className="img-fluid mt-2"
                        alt="Coral"
                      />
                    </div>
                    <div className="btn-group mt-3">
                      {report.status === 'em-analise' && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => updateStatus(report.id, 'deferida')}
                        >
                          Deferir
                        </button>
                      )}
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => showJustificationModal(report.id)}
                      >
                        Excluir
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => forwardPost(report.id)}
                      >
                        Enviar Post
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overlay" id="overlay" style={{ display: 'none' }}></div>
      <div
        className="modal-justify"
        id="justificationModal"
        style={{ display: 'none' }}
      >
        <h5>Justificativa para Exclusão</h5>
        <textarea
          className="form-control mt-3"
          id="justificationText"
          rows="4"
          placeholder="Digite sua justificativa..."
        ></textarea>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={submitJustification}>
            Enviar
          </button>
          <button className="btn btn-secondary" onClick={closeJustificationModal}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default Mod;
