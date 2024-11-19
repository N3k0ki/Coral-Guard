import React, { useEffect, useState } from 'react'; // Importando useState e useEffect
import { Link } from 'react-router-dom';
import './inicio.css';
/*import logo from '../../assents/logo.svg';
import bookIcon from '../../assents/book.png';
import addIcon from '../../assents/adicionar.png';
import profileIcon from '../../assents/profile.png';*/
import { storage, db } from '../../firebase/firebase.js'; // Certifique-se de que db está sendo exportado corretamente do seu arquivo firebase.js
import { collection, addDoc } from 'firebase/firestore'; // Importando as funções necessárias do Firestore
import './inicio.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from 'react-places-autocomplete'; // Importando o PlacesAutocomplete

const containerStyle = {
    width: '100%',
    height: '400px',
};

export function Inicio({ usuario }) {
    /*const [usuarioLocal, setUsuarioLocal] = useState({ name: '' });

    useEffect(() => {
        // Caso o usuario prop esteja vazio, buscamos no localStorage
        if (usuario && usuario.name) {
            setUsuarioLocal({ name: usuario.name });
            localStorage.setItem('usuarioNome', usuario.name); // Armazenar o nome no localStorage
        } else {
            const nomeUsuario = localStorage.getItem('usuarioNome');
            if (nomeUsuario) {
                setUsuarioLocal({ name: nomeUsuario });
            }
        }
    }, [usuario]); // Esse efeito será disparado sempre que a prop `usuario` mudar

    const nomeUsuario = usuarioLocal.name || 'Visitante'; // Se o nome não for encontrado, exibe 'Visitante'

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Armazena o arquivo selecionado
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Por favor, selecione uma imagem!');
            return;
        }

        const imageUrl = await storage(file);
        console.log('Imagem enviada com sucesso:', imageUrl);
    };*/
    
    const [file, setFile] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState(''); // Estado para armazenar a data selecionada
    const [endereco, setEndereco] = useState(''); // Estado para armazenar o endereço selecionado
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

    // Função para lidar com a seleção do arquivo de imagem
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Armazenar o arquivo selecionado
    };

    // Função para lidar com a mudança da data
    const handleDataChange = (e) => {
        setDataSelecionada(e.target.value); // Armazenar a data selecionada
    };

    // Função para enviar dados para o Firestore
    const enviarDataParaFirebase = async () => {
        if (!dataSelecionada || !endereco || !file) {
            alert('Por favor, selecione uma data, um endereço e uma imagem!');
            return;
        }

        try {
            setIsLoading(true); // Ativar carregamento
            const docRef = await addDoc(collection(db, 'posts'), {
                data: dataSelecionada,
                endereco, // Armazenando o endereço selecionado
                createdAt: new Date(),
            });

            console.log('Post enviado com sucesso! Documento ID:', docRef.id);
            alert('Post enviado com sucesso!');
        } catch (e) {
            console.error('Erro ao enviar o post: ', e);
            alert('Erro ao enviar o post');
        } finally {
            setIsLoading(false); // Desativar carregamento
        }
    };

    // Função para enviar a imagem para o Firebase Storage
    const enviarImagemParaFirebase = async () => {
        if (!file) {
            alert('Por favor, selecione uma imagem!');
            return;
        }

        try {
            const imageRef = storage.ref().child(`images/${file.name}`); // Referência do arquivo no Storage
            await imageRef.put(file); // Envia o arquivo
            const imageUrl = await imageRef.getDownloadURL(); // Obtém a URL da imagem

            console.log('Imagem enviada com sucesso:', imageUrl);
        } catch (e) {
            console.error('Erro ao enviar a imagem: ', e);
            alert('Erro ao enviar a imagem');
        }
    };


   return (
        /*<div className="home-body">
            <header className="header-home">
                <div className="container-home">
                    <div className="logo-home">
                        <img src={logo} alt="Logo Coral Guard" className="src-home" />
                        <p className="tag-home">Coral Guard</p>
                    </div>
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
                    <p className="text-map">Comece a mapear</p>
                </div>
            </section>
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload}>Enviar Imagem</button>
            </div>
            <div className="line-home"></div>

            <footer className="fixed-bar">
                <Link to="/pagina1" className="icon-link">
                    <img src={bookIcon} alt="Biblioteca" className="home-img" />
                </Link>
                <Link to="/pagina2" className="circle-button">
                    <img src={addIcon} alt="Fazer uma postagem" className="home-add" />
                </Link>
                <Link to="/pagina3" className="icon-link">
                    <img src={profileIcon} alt="Perfil" className="home-img" />
                </Link>
            </footer>
        </div>*/
        <div>
            <h2>Adicionar Post</h2>

            {/* Carregar o script da Google Maps API */}
            <LoadScript googleMapsApiKey="AIzaSyBtIClS91NTN7c2s5BFs7Hmtu6VO_n7iX4" libraries={['places']}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{ lat: -34.397, lng: 150.644 }}
                    zoom={8}
                >
                    {/* Aqui você pode adicionar o mapa ou outras funcionalidades */}
                </GoogleMap>
            </LoadScript>

            {/* Caixa de pesquisa de endereços */}
            <PlacesAutocomplete
                value={endereco}
                onChange={setEndereco}
                onSelect={setEndereco}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                        <input
                            {...getInputProps({ placeholder: 'Digite o endereço' })}
                            className="address-input"
                        />
                        <div className="autocomplete-dropdown-container">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    {...getSuggestionItemProps(suggestion, {
                                        className: 'suggestion-item',
                                    })}
                                >
                                    {suggestion.description}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            {/* Restante do formulário */}
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
            />
            <button onClick={enviarDataParaFirebase}>Enviar Post</button>
        </div>
    );
}

export default Inicio;
