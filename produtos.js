// Carrossel tipo slide horizontal e listagem de produtos
document.addEventListener("DOMContentLoaded", function () {
  // Carrossel Slide
  const carrosselImages = document.querySelectorAll("#carrossel img");
  const btnPrev = document.getElementById("carrossel-prev");
  const btnNext = document.getElementById("carrossel-next");
  const dotsContainer = document.getElementById("carrossel-dots");
  let carrosselIndex = 0;
  let carrosselTimeout;

  // Criar dots
  function createDots() {
    dotsContainer.innerHTML = "";
    carrosselImages.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        goToCarrosselImage(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === carrosselIndex);
    });
  }

  function showCarrosselImage(newIndex, direction) {
    carrosselImages.forEach((img, idx) => {
      img.classList.remove("slide-in", "slide-out-left", "slide-out-right");
      img.style.zIndex = 1;
    });
    if (direction === "right") {
      carrosselImages[carrosselIndex].classList.add("slide-out-left");
      carrosselImages[newIndex].classList.add("slide-in");
    } else if (direction === "left") {
      carrosselImages[carrosselIndex].classList.add("slide-out-right");
      carrosselImages[newIndex].classList.add("slide-in");
    } else {
      carrosselImages[newIndex].classList.add("slide-in");
    }
    carrosselImages[newIndex].style.zIndex = 2;
    carrosselIndex = newIndex;
    updateDots();
  }

  function nextCarrosselImage() {
    const nextIndex = (carrosselIndex + 1) % carrosselImages.length;
    showCarrosselImage(nextIndex, "right");
    resetCarrosselTimeout();
  }

  function prevCarrosselImage() {
    const prevIndex =
      (carrosselIndex - 1 + carrosselImages.length) % carrosselImages.length;
    showCarrosselImage(prevIndex, "left");
    resetCarrosselTimeout();
  }

  function goToCarrosselImage(idx) {
    if (idx === carrosselIndex) return;
    const direction = idx > carrosselIndex ? "right" : "left";
    showCarrosselImage(idx, direction);
    resetCarrosselTimeout();
  }

  function resetCarrosselTimeout() {
    clearInterval(carrosselTimeout);
    carrosselTimeout = setInterval(nextCarrosselImage, 2000);
  }

  btnNext.addEventListener("click", function (e) {
    e.stopPropagation();
    nextCarrosselImage();
  });
  btnPrev.addEventListener("click", function (e) {
    e.stopPropagation();
    prevCarrosselImage();
  });

  createDots();
  showCarrosselImage(carrosselIndex);
  carrosselTimeout = setInterval(nextCarrosselImage, 2000);

  // Listagem de produtos
  fetch("produtos.json")
    .then((response) => response.json())
    .then((produtos) => {
      const secao = document.getElementById("produtos");
      secao.innerHTML = produtos
        .map(
          (produto) => `
        <div class="produto">
          <img src="${produto.imagem}" alt="${produto.produto}">
          <h3>${produto.produto}</h3>
          <p>${produto.detalhe}</p>
          <span>R$ ${produto.preço.toFixed(2)}</span>
        </div>
      `
        )
        .join("");
    });
});

//---------------------------------------------------------------------------//

[
  {
    id: 1,
    produto: "Ração Premium para Cães",
    preço: 89.9,
    detalhe: "Ração de alta qualidade para cães de todas as idades.",
    imagem: "assets/images/racao1.jpg",
  },
  {
    id: 2,
    produto: "Brinquedo para Gato",
    preço: 29.9,
    detalhe: "Brinquedo interativo para gatos, estimula a atividade física.",
    imagem: "assets/images/brinquedo1.jpg",
  },
  {
    id: 3,
    produto: "Coleira Refletiva",
    preço: 39.9,
    detalhe: "Coleira de segurança com material refletivo.",
    imagem: "assets/images/coleira.jpg",
  },
  {
    id: 4,
    produto: "Cama para Cachorro",
    preço: 159.9,
    detalhe: "Cama confortável para cães de médio porte.",
    imagem: "assets/images/cama.jpg",
  },
  {
    id: 5,
    produto: "Shampoo para Pets",
    preço: 24.9,
    detalhe: "Shampoo suave para a pele e pelagem dos pets.",
    imagem: "assets/images/shampoo.jpg",
  },
];

//-------------------------------------------------------------//
