import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function criarEpopularTabelaUsuarios() {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database
    });

    await db.run(
        `CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT,
            email TEXT,
            senha TEXT
        )`
    );
    return db;
}


app.post('/registrar', async (req, res) => {
    const {usuario, email, senha } = req.body;

    try {
        const db = await criarEpopularTabelaUsuarios();
        await db.run(
            `INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?, ?)`,
            [usuario, email, senha]
        );
        res.status(200).send('Usuário registrado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao registrar o usuário.');
        console.error(error);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
