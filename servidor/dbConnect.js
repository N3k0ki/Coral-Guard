import { MongoClient } from "mongodb";

const cliente = new MongoClient(
    "mongodb+srv://Ana:06012010@coralcluster.uxo3o.mongodb.net/?retryWrites=true&w=majority&appName=coralcluster"
);

let documentosColecao;
let registrosColecao

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    documentosColecao = db.collection("Coral-Guard");
    registrosColecao = db.collection("registros")

    console.log("conectado ao banco de dados com sucesso!")
} catch (erro) {
    console.log(erro);
}

// Mova a declaração 'export' para fora do bloco 'try...catch'
export { documentosColecao, registrosColecao };