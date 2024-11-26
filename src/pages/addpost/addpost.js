import React, { useState } from "react";
import { db } from "../../firebase/firebase"; // Certifique-se de que o Firebase foi configurado
import { collection, addDoc } from "firebase/firestore"; // Para adicionar dados ao Firestore
import './addpost.css';

export function CoralForm() {
    const [formData, setFormData] = useState({
        date: "",
        location: "",
        reference: "",
        temperature: "",
        status: "",
        observations: "",
        image: null,
    });

    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            status: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: URL.createObjectURL(file),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                image: null,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formCollection = collection(db, "coralRecords");

            // Envia os dados para o Firestore
            await addDoc(formCollection, {
                date: formData.date,
                location: formData.location,
                reference: formData.reference,
                temperature: formData.temperature,
                status: formData.status,
                observations: formData.observations,
                image: formData.image,
            });

            // Exibe a mensagem de sucesso
            setSuccessMessage(true);

            // Limpa o formulário após 3 segundos
            setTimeout(() => {
                setSuccessMessage(false);
                setFormData({
                    date: "",
                    location: "",
                    reference: "",
                    temperature: "",
                    status: "",
                    observations: "",
                    image: null,
                });
            }, 3000);
        } catch (error) {
            console.error("Erro ao salvar dados no Firestore:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container coral-form-container">
            <form className="coral-form" onSubmit={handleSubmit}>
                <h1 className="coral-form-title">🌊 Registro de Monitoramento Coral</h1>
                
                <div className="form-group coral-form-group">
                    <label htmlFor="date" className="form-label">Data</label>
                    <input
                        type="date"
                        id="date"
                        className="form-input"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group coral-form-group">
                    <label htmlFor="location" className="form-label">Localização</label>
                    <input
                        type="text"
                        id="location"
                        className="form-input"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Digite a localização"
                        required
                    />
                </div>

                <div className="form-group coral-form-group">
                    <label htmlFor="reference" className="form-label">Ponto de Referência</label>
                    <input
                        type="text"
                        id="reference"
                        className="form-input"
                        value={formData.reference}
                        onChange={handleInputChange}
                        placeholder="Digite o ponto de referência"
                        required
                    />
                </div>

                <div className="form-group coral-form-group">
                    <label htmlFor="temperature" className="form-label">Temperatura (°C)</label>
                    <input
                        type="number"
                        id="temperature"
                        step="0.1"
                        className="form-input"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        placeholder="Digite a temperatura"
                        required
                    />
                </div>

                <div className="form-group coral-form-group">
                    <label className="form-label">Estado Físico dos Corais</label>
                    <div className="coral-status">
                        {["Excelente", "Bom", "Regular", "Ruim"].map((status) => (
                            <div className="status-option coral-status-option" key={status}>
                                <input
                                    type="radio"
                                    id={status}
                                    name="status"
                                    value={status}
                                    className="status-radio"
                                    checked={formData.status === status}
                                    onChange={handleRadioChange}
                                    required
                                />
                                <label htmlFor={status} className="status-label">
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group coral-form-group">
                    <label className="form-label">Imagem do Coral</label>
                    <div
                        id="imagePreview"
                        className={`image-preview coral-image-preview ${
                            formData.image ? "" : "empty"
                        }`}
                    >
                        {formData.image ? (
                            <img
                                src={formData.image}
                                alt="Preview da imagem do coral"
                                className="preview-image"
                            />
                        ) : (
                            "Nenhuma imagem selecionada"
                        )}
                    </div>
                    <label className="custom-file-upload coral-file-upload">
                        <input
                            type="file"
                            id="imageInput"
                            className="file-input"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        Escolher Imagem
                    </label>
                </div>

                <div className="form-group coral-form-group">
                    <label htmlFor="observations" className="form-label">Observações</label>
                    <textarea
                        id="observations"
                        rows="4"
                        className="form-textarea"
                        value={formData.observations}
                        onChange={handleInputChange}
                        placeholder="Digite suas observações"
                    />
                </div>

                <button
                    type="submit"
                    className="form-submit-btn"
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar Registro"}
                </button>
            </form>

            {successMessage && (
                <div id="successMessage" className="success-message coral-success-message">
                    Registro enviado com sucesso!
                </div>
            )}
        </div>
    );
}

export default CoralForm;
