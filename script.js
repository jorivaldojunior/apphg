// script.js

// Lógica para exibir o botão após 6 segundos
setTimeout(function () {
  document.getElementById("openFingerprintScreen").classList.remove("hidden");
}, 6000);

// Lógica para abrir a tela de impressão digital
document.getElementById("openFingerprintScreen").addEventListener("click", function () {
  document.getElementById("fingerprintScreen").classList.remove("hidden");
});

// Lógica para abrir a tela de padrão (desenho)
document.getElementById("usePattern").addEventListener("click", function () {
  document.getElementById("fingerprintScreen").classList.add("hidden");
  document.getElementById("patternScreen").classList.remove("hidden");
});

// Lógica do desenho
const points = document.querySelectorAll("[data-point]");
let selectedPoints = [];

// Função para verificar se os pontos 1, 2 e 3 foram selecionados
function checkPattern() {
  const requiredPoints = [1, 2, 3];
  const isPatternCorrect = requiredPoints.every(point => selectedPoints.includes(point));

  if (isPatternCorrect) {
    // Redireciona para index1.html após 1 segundo
    setTimeout(() => {
      window.location.href = "index1.html";
    }, 1000);
  }
}

// Função para adicionar um ponto à lista de selecionados
function addPoint(point) {
  const pointNumber = parseInt(point.getAttribute("data-point"));

  // Adiciona o ponto à lista de selecionados (se ainda não estiver)
  if (!selectedPoints.includes(pointNumber)) {
    selectedPoints.push(pointNumber);
    point.classList.add("selected"); // Adiciona o contorno verde
  }

  // Verifica o padrão
  checkPattern();
}

// Adiciona eventos de toque/arrasto nas bolinhas
points.forEach((point) => {
  // Evento de toque inicial
  point.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Evita comportamento padrão
    addPoint(point);
  });

  // Evento de arrastar sobre as bolinhas
  point.addEventListener("touchmove", (e) => {
    e.preventDefault();
    // Verifica qual bolinha está sendo tocada durante o arrasto
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.hasAttribute("data-point")) {
      addPoint(element);
    }
  });

  // Evento de clique (para desktop)
  point.addEventListener("click", () => {
    addPoint(point);
  });
});


function abrirWhatsApp() {
  window.open("https://api.whatsapp.com/send/?phone=5581991152307&text&type=phone_number&app_absent=0", "_blank");
}

function abrirFacebook() {
  window.open("https://www.facebook.com/hospitalguararapes/?locale=pt_BR", "_blank");
}

function abrirInstagram() {
  window.open("https://www.instagram.com/guararapeshospital/#", "_blank");
}

