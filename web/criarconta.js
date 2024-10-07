// criarconta.js
const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita que o formulário recarregue a página

  const nome = form["user"].value;
  const senha = form["senha"].value;
  const email = form["email"].value;

  console.log("cadastrado");

  // Crie um objeto com os dados do formulário
  const dados = {
    nome: usuario,
    email: email,
    senha: senha
  };

  emitirCadastrarUsuario({ nome, senha });

  // Envie os dados para o servidor usando fetch (opcional)
  fetch("http://localhost:3000/registrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
  .then(response => {
    // Verifique se a resposta do servidor foi bem-sucedida
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