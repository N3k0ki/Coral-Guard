import { emitirCadastrarUsuario } from "./socket-front-cadastro.js"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  form.addEventListener("submit", (evento) => {
      evento.preventDefault(); // Evita que o formulário recarregue a página

      // Acessando os valores corretamente
      const user = form["user"].value;
      const email = form["email"].value;
      const senha = form["senha"].value;

      // Verificação para garantir que os valores estão sendo capturados
      console.log(`Nome: ${user}, Email: ${email}, Senha: ${senha}`);

      const dados = {
          user: user,
          email: email,
          senha: senha
      };

      fetch("http://localhost:3000/registrar", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
      })
      .then(response => {
          if (response.ok) {
              alert("Usuário cadastrado com sucesso!");
          } else {
              alert("Erro ao cadastrar usuário.");
          }
      })
      .catch(error => {
          alert("Erro ao conectar com o servidor.");
      });
  });
});