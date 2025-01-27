import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import { storage } from "../../firebase/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import "./addpost.css";

function CoralForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    reference: "",
    temperature: "",
    estado: "",
    status:"",
    observations: "",
    image: null,
    userName: "",
    userEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUserEmail = "email-do-usuario-logado"; // Substitua com autenticação Firebase
      const userDocRef = doc(db, "Usuarios", currentUserEmail);

      try {
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setFormData((prevData) => ({
            ...prevData,
            userName: userData.nome,
            userEmail: currentUserEmail,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

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
      estado: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const photoId = crypto.randomUUID();
  
    try {
      let uploadedImageUrl = "";
  
      if (formData.image) {
        const storageRef = ref(storage, `coralImages/${photoId}`);
        await uploadBytes(storageRef, formData.image);
        uploadedImageUrl = await getDownloadURL(storageRef);
        setImageUrl(uploadedImageUrl);
      }
  
      const cleanedFormData = { ...formData };
      delete cleanedFormData.image;
  
      // Definindo o estado como "em-analise" ao criar o post
      const formRef = doc(db, "coralRecords", photoId);
      await setDoc(formRef, {
        ...cleanedFormData,
        imageUrl: uploadedImageUrl,
        id: photoId,
        estado: "em-analise",  // Adiciona o campo estado com valor "em-analise"
        userName: formData.userName,
        userEmail: formData.userEmail,
      });
  
      navigate("/success");
    } catch (error) {
      console.error("Erro ao salvar dados no Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container coral-form-container">
      <form className="coral-form" onSubmit={handleSubmit}>
        <h1 className="coral-form-title">🌊 Registro de Monitoramento de Corais</h1>

        {/* Campos do formulário */}
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
            placeholder="Digite o ponto de referência"
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
            {["Excelente", "Bom", "Regular", "Ruim"].map((estado) => (
              <div className="status-option coral-status-option" key={estado}>
                <input
                  type="radio"
                  id={estado}
                  name="status"
                  value={estado}
                  className="status-radio"
                  checked={formData.estado === estado}
                  onChange={handleRadioChange}
                  required
                />
                <label htmlFor={estado} className="status-label">
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de selecionar imagem */}
        <div className="form-group coral-form-group">
          <label className="form-label">Imagem do Coral</label>
          <input
            type="file"
            className="file-input"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Pré-visualização da imagem */}
        <div className={`image-preview coral-image-preview ${imageUrl ? "" : "empty"}`}>
          {imageUrl ? (
            <img className="file-display" src={imageUrl} alt="Pré-visualização do Coral" />
          ) : (
            <span className="placeholder-text">Nenhuma imagem selecionada</span>
          )}
        </div>

        {/* Observações */}
        <div className="form-group coral-form-group">
          <label htmlFor="observations" className="form-label">Observações</label>
          <textarea
            id="observations"
            rows="4"
            className="form-textarea"
            placeholder="Digite suas observações"
            value={formData.observations}
            onChange={handleInputChange}
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="form-submit-btn"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Registro"}
        </button>
      </form>
    </div>
  );
}

export default CoralForm;