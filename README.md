# 🐠 **Coral Guard** 🌊

**Coral Guard** é um projeto dedicado à preservação dos corais e à conscientização sobre a saúde dos oceanos. A plataforma permite que os usuários registrem e compartilhem dados sobre os corais, incentivando ações para proteger esses ecossistemas vitais. 🌍💚

## 🚀 **Funcionalidades**

- **🔒 Autenticação de Usuários**: Faça login ou crie uma conta usando o Firebase Authentication.
- **🗺️ Mapeamento de Corais**: Registre a condição dos corais (saudáveis, levemente branqueados, etc.), com imagens e localização.
- **🌐 Visualização de Dados**: Exibição interativa de postagens públicas em um mapa.
- **👍 Socialização**: Curtidas, comentários e compartilhamentos das postagens.
- **💾 Armazenamento Seguro**: Todos os dados são armazenados de forma segura no Firebase Firestore e Firebase Storage.

## 🛠️ **Tecnologias Usadas**

- **Frontend**: 
  - **React.js** ⚛️
  - **Firebase** (Auth, Firestore, Storage) 🔥
  - **React Router** 🚗
- **Backend**:
  - **Firebase Functions** (opcional) ⚙️
  - **Firebase Realtime Database** ou **Firestore** 📊

## 📝 **Instalação**

Siga os passos abaixo para rodar o projeto localmente:

### 1️⃣ **Clonar o repositório**:

```bash```
git clone https://github.com/seuusuario/coral-guard.git

### 2️⃣ ** Instalar dependências:**

No diretório do projeto, execute:
npm install

### 3️⃣ **Configurar o Firebase:**

Crie um projeto no Firebase Console.
Adicione o arquivo de configuração do Firebase (firebaseConfig.js) na pasta src com as credenciais da sua conta Firebase.

### 4️⃣ **Executar o projeto:**
Para rodar o projeto localmente, execute:
npm start

Isso iniciará o servidor de desenvolvimento e abrirá o site no navegador.

## 📂 **Estrutura do Projeto**
📂 Aqui está a estrutura básica do projeto

/coral-guard
  /public
    index.html          # Página HTML principal
  /src
    /assets             # Imagens e recursos estáticos
    /firebase           # Arquivos de configuração do Firebase
    /pages              # Páginas React
    /styles             # Estilos globais (CSS)
    _routes.js          # Componente principal
    index.js            # Rotas dinâmicas usando HashRouter

## 🤝 **Contribuição**
Contribuições são bem-vindas!
