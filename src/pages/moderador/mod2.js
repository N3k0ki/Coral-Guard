import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js"; // Certifique-se de usar o caminho correto para seu arquivo Firebase
import "./mod.css"; // Importando o CSS

const Mod = () => {
    const [postList, setPostList] = useState([]);
    const [filter, setFilter] = useState("todos");
    const [deleteReason, setDeleteReason] = useState("");
    const [postToDelete, setPostToDelete] = useState(null);

    // Busca os dados do Firestore ao montar o componente
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "coralRecords"));
                const posts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    status: "em análise", // Definindo status padrão
                    ...doc.data(),
                }));
                setPostList(posts);
            } catch (error) {
                console.error("Erro ao buscar dados dos corais:", error);
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

    const handleDelete = () => {
        if (postToDelete && deleteReason.trim()) {
            setPostList(postList.filter((post) => post.id !== postToDelete));
            setDeleteReason("");
            setPostToDelete(null);
            alert("Post excluído com justificativa: " + deleteReason);
        } else {
            alert("Preencha uma justificativa para excluir o post.");
        }
    };

    const sendToHome = (id) => {
        const post = postList.find((post) => post.id === id);
        if (post && post.status === "deferido") {
            alert("Post enviado para a página inicial.");
        } else {
            alert("Apenas posts deferidos podem ser enviados para a página inicial.");
        }
    };

    const filteredPosts =
        filter === "todos"
            ? postList
            : postList.filter((post) => post.status === filter);

    return (
        <div className="container-mod">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-mod">
                    <span className="navbar-brand mb-0 h1">Painel do Administrador</span>
                    <span className="text-light">Bem-vindo, Admin</span>
                </div>
            </nav>

            <div className="row mt-4">
                {/* Coluna de Estatísticas e Filtros */}
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5>Estatísticas</h5>
                            <div className="mt-3">
                                <p>Total de denúncias: {postList.length}</p>
                                <p>
                                    Em análise:{" "}
                                    {postList.filter((post) => post.status === "em análise").length}
                                </p>
                                <p>
                                    Deferidas:{" "}
                                    {postList.filter((post) => post.status === "deferido").length}
                                </p>
                                <p>
                                    Indeferidas:{" "}
                                    {postList.filter((post) => post.status === "indeferido").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="btn-group mb-4 mt-4 w-100">
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
                            onClick={() => setFilter("deferido")}
                        >
                            Deferidos
                        </button>
                    </div>
                </div>

                {/* Coluna de Posts */}
                <div className="col-md-9">
                    {filteredPosts.map((post) => (
                        <div
                            className={`card report-card mb-4 ${post.status === "em análise"
                                    ? "status-em-analise"
                                    : post.status === "deferido"
                                        ? "status-deferido"
                                        : "status-indeferido"
                                }`}
                            key={post.id}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Denúncia #{post.id}</h5>
                                <p><strong>Data:</strong> {post.date}</p>
                                <p><strong>Local:</strong> {post.location}</p>
                                <p><strong>Status:</strong> {post.status}</p>
                                <p><strong>Observações:</strong> {post.observations}</p>
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt="Coral"
                                        className="img-fluid"
                                    />
                                )}
                                <div className="mt-3">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => updateStatus(post.id, "deferido")}
                                    >
                                        Deferir
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => updateStatus(post.id, "indeferido")}
                                    >
                                        Indeferir
                                    </button>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => sendToHome(post.id)}
                                    >
                                        Enviar para Início
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setPostToDelete(post.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {postToDelete && (
                <div className="modal justify-content-center">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Justificativa para Exclusão</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setPostToDelete(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <textarea
                                    className="form-control"
                                    value={deleteReason}
                                    onChange={(e) => setDeleteReason(e.target.value)}
                                    rows="4"
                                    placeholder="Informe a justificativa"
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleDelete}>
                                    Confirmar
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setPostToDelete(null)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mod;



