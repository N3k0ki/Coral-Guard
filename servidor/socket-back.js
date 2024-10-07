import registrarEventosCadastro from "./registrarEventosCadastro.js";
import io from "./servidor.js";

io.on("connection", (socket) => { // Agora o socket está disponível aqui
    const timestamp = Date.now(); 
    const dataHora = new Date(timestamp).toLocaleString();
    console.log(`Um cliente se conectou!
    ID: ${socket.id}
    data: ${dataHora}`); 

    registrarEventosCadastro(socket, io)

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento);
    
        const documento = await encontrarDocumento(nomeDocumento);
    
        if (documento) {
          devolverTexto(documento.texto);
        }
      });
    
      socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
    
        if (atualizacao.modifiedCount) {
          socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
      });
    })


