import { cadastrarUsuarios } from "./registrosDb.js";
function registrarEventosCadastro(socket, io){
    socket.on("submit", async (dados) => {
        const resultado = await cadastrarUsuarios(dados);

        console.log(resultado)
    })
}

export default registrarEventosCadastro;