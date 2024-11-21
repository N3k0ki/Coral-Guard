import { cadastrarUsuarios } from "./registrosDb.js";
function registrarEventosCadastro(socket, io){
    socket.on("cadastrar_usuario", async (dados) => {
        const resultado = await cadastrarUsuarios(dados);

        console.log(resultado)
    })
}

export default registrarEventosCadastro;