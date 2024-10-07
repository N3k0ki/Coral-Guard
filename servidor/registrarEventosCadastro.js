// registrarEventosCadastro.js
function registrarEventosCadastro(socket, io){
    socket.on("submit", async (dados) => {
        const resultado = await cadastrarUsuarios(dados);

    })
}

export default registrarEventosCadastro;