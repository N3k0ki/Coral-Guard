import { emitirCadastrarUsuario } from "./socket-front-cadastro.js"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  form.addEventListener("submit", (evento) => {
      evento.preventDefault(); // Evita que o formulário recarregue a página

      // Acessando os valores corretamente
      const nome = form["nome"].value;
      const email = form["email"].value;
      const senha = form["senha"].value;

      // Verificação para garantir que os valores estão sendo capturados
      alert(`Nome: ${nome}, Email: ${email}, Senha: ${senha}`);

      const dados = {
          nome: nome,
          email: email,
          senha: senha
      };
  });
