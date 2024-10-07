import { emitirCadastrarUsuario } from "./socket-front-cadastro";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita que o formulário recarregue a página

  const usuario = form["user"].value;
  const senha = form["senha"].value;
  const email = form["email"].value;

  // Exibe os dados dos inputs no console
  console.log("Usuário:", usuario);
  console.log("E-mail:", email);
  console.log("Senha:", senha);

  emitirCadastrarUsuario({ usuario, senha});

});