document.addEventListener("DOMContentLoaded",function(){
  const imgs = document.getElementById("img");
  const img = document.querySelectorAll("#img img");

  let idx = 0;

  function carrossel() {
      idx++;

      if (idx > img.length - 1) {
          idx = 0;
      }

      imgs.style.transform = `translateX(${-idx * 100}%)`;
  }

  setInterval(carrossel, 1800);
});

document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".block");

  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  entry.target.classList.add("show"); // Aplica fade-in quando visível
              } else {
                  entry.target.classList.remove("show"); // Remove fade-in quando não visível
              }
          });
      },
      {
          threshold: 0.1, // 10% do bloco visível ativa a animação
      }
  );

  blocks.forEach((block) => {
      observer.observe(block); // Observa todos os blocos com a classe .block
  });
});

