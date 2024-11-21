import { registrosColecao } from "./dbConnect.js"

function cadastrarUsuarios({ user, senha, email }){
    return registrosColecao.insertOne({ user , senha, email })
}

export { cadastrarUsuarios };