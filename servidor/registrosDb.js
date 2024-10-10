import { registrosColecao } from "./dbConnect.js"

function cadastrarUsuarios({ user, senha}){
    return registrosColecao.insertOne({ user , senha })
}

export { cadastrarUsuarios };