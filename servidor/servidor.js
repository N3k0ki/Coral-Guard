import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./dbConnect.js";

const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "web");
app.use(express.static(diretorioPublico));

// Middlewares para lidar com JSON e dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => console.log(`Servidor escutando na porta ${porta}`));

const io = new Server(servidorHttp);

app.post("/registrar", (req, res) => {
    const { user, email, senha } = req.body;

    console.log(`Usuário: ${user}, Email: ${email}, Senha: ${senha}`);

    // Aqui você pode adicionar lógica para salvar no banco de dados ou fazer validações
    if (user && email && senha) {
        res.status(200).send("Registro realizado com sucesso!");
    } else {
        res.status(400).send("Dados inválidos!");
    }
});

export default io;