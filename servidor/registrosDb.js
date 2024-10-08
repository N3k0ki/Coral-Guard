import { registrosColecao } from "./dbConnect.js"

function cadastrarUsuarios({ nome, senha}){
    return registrosColecao.insertOne({ nome , senha })
}

export { cadastrarUsuarios };