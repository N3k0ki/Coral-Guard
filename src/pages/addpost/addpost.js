import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import "./addpost.css";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

function CoralForm({ onPlaceSelect }) {
  const GOOGLE_MAPS_API_KEY = "AIzaSyA7e5VawOzJRv5Kyjb7fs-ihaoTQql25nc"

  const [searchBox, setSearchBox] = useState(null);
  const inputRef = useRef(null);

  const handleLoad = (ref) => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places.length > 0) {
        const place = places[0];
        const locationData = {
          name: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };

        onPlaceSelect(locationData);
      }
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    reference: "",
    temperature: "",
    estado: "",
    status: "",
    observations: "",
    image: null,
    userName: "",
    userEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUserEmail = "email-do-usuario-logado"; // Substituir com autenticação Firebase
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

      const formRef = doc(db, "coralRecords", photoId);
      await setDoc(formRef, {
        ...cleanedFormData,
        imageUrl: uploadedImageUrl,
        id: photoId,
        estado: "em-analise",
        status: formData.status,
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

        {/* Data */}
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
        <div className="form-group coral-form-group"><label htmlFor="location" className="form-label">Localização</label></div>
        
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <StandaloneSearchBox onLoad={handleLoad} onPlacesChanged={handlePlacesChanged}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite um local..."
              className="form-input"
              
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "2px solid #1a4b77",
                margin: "10px",
              }}
            />
          </StandaloneSearchBox>
        </LoadScript> 

        {/* Ponto de Referência */}
        <div className="form-group coral-form-group">
          <label htmlFor="reference" className="form-label">Ponto de Referência</label>
          <input
            type="text"
            id="reference"
            className="form-input"
            value={formData.reference}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Temperatura */}
        <div className="form-group coral-form-group">
          <label htmlFor="temperature" className="form-label">Temperatura (°C)</label>
          <input
            type="number"
            id="temperature"
            step="0.1"
            className="form-input"
            value={formData.temperature}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Estado Físico dos Corais */}
        <div className="form-group coral-form-group">
          <label className="form-label">Estado Físico dos Corais</label>
          <div className="coral-status">
            {["Excelente", "Bom", "Regular", "Ruim"].map((status) => (
              <div className="status-option coral-status-option" key={status}>
                <input
                  type="radio"
                  id={`status-${status}`}
                  name="status"
                  value={status}
                  className="status-radio"
                  checked={formData.status === status}
                  onChange={handleRadioChange}
                  required
                />
                <label htmlFor={`status-${status}`} className="status-label">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Imagem do Coral */}
        <div className="form-group coral-form-group">
          <label className="form-label">Imagem do Coral</label>
          <input type="file" className="file-input" onChange={handleImageChange} required />
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
            value={formData.observations}
            onChange={handleInputChange}
          />
        </div>

        {/* Botão de Envio */}
        <button type="submit" className="form-submit-btn" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Registro"}
        </button>
      </form>
    </div>
  );
}

export default CoralForm;
