// Aguarda o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function () {
  // Lógica para exibir o botão após 3 segundos
  setTimeout(function () {
    const openFingerprintButton = document.getElementById("openFingerprintScreen");
    if (openFingerprintButton) {
      openFingerprintButton.classList.remove("hidden");
    }
  }, 3000);

  // Lógica para abrir a tela de impressão digital
  const openFingerprintScreenButton = document.getElementById("openFingerprintScreen");
  if (openFingerprintScreenButton) {
    openFingerprintScreenButton.addEventListener("click", function () {
      const fingerprintScreen = document.getElementById("fingerprintScreen");
      if (fingerprintScreen) {
        fingerprintScreen.classList.remove("hidden");
      }
    });
  }

  // Lógica para abrir a tela de padrão (desenho)
  const usePatternButton = document.getElementById("usePattern");
  if (usePatternButton) {
    usePatternButton.addEventListener("click", function () {
      const fingerprintScreen = document.getElementById("fingerprintScreen");
      const patternScreen = document.getElementById("patternScreen");
      if (fingerprintScreen && patternScreen) {
        fingerprintScreen.classList.add("hidden");
        patternScreen.classList.remove("hidden");
        initPatternScreen();
      }
    });
  }

  // Variáveis para o padrão
  let selectedPoints = [];
  let canvas, ctx;
  let isDrawing = false;
  let lastPoint = null;

  // Inicializa a tela de padrão
  function initPatternScreen() {
    selectedPoints = [];
    lastPoint = null;
    
    // Configura o canvas
    canvas = document.getElementById('patternCanvas');
    ctx = canvas.getContext('2d');
    
    // Define o tamanho do canvas
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Limpa o canvas
    clearCanvas();
    
    // Reinicia os pontos
    const points = document.querySelectorAll('.point');
    points.forEach(point => {
      point.classList.remove('selected');
    });
  }

  // Limpa o canvas
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Desenha uma linha entre dois pontos
  function drawLine(point1, point2) {
    const rect1 = point1.getBoundingClientRect();
    const rect2 = point2.getBoundingClientRect();
    const container = canvas.getBoundingClientRect();
    
    const x1 = rect1.left + rect1.width / 2 - container.left;
    const y1 = rect1.top + rect1.height / 2 - container.top;
    const x2 = rect2.left + rect2.width / 2 - container.left;
    const y2 = rect2.top + rect2.height / 2 - container.top;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

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
      
      // Desenha a linha se houver um ponto anterior
      if (lastPoint) {
        drawLine(lastPoint, point);
      }
      
      lastPoint = point;
    }

    // Verifica o padrão
    checkPattern();
  }

  // Adiciona eventos de toque/arrasto nas bolinhas
  function setupPatternEvents() {
    const points = document.querySelectorAll(".point");
    
    if (points.length > 0) {
      points.forEach((point) => {
        // Evento de toque inicial
        point.addEventListener("touchstart", (e) => {
          e.preventDefault(); // Evita comportamento padrão
          isDrawing = true;
          addPoint(point);
        });

        // Evento de arrastar sobre as bolinhas
        point.addEventListener("touchmove", (e) => {
          e.preventDefault();
          if (!isDrawing) return;
          
          // Verifica qual bolinha está sendo tocada durante o arrasto
          const touch = e.touches[0];
          const element = document.elementFromPoint(touch.clientX, touch.clientY);
          if (element && element.hasAttribute("data-point")) {
            addPoint(element);
          }
        });

        // Evento de fim de toque
        document.addEventListener("touchend", () => {
          isDrawing = false;
        });

        // Evento de clique (para desktop)
        point.addEventListener("mousedown", () => {
          isDrawing = true;
          addPoint(point);
        });

        point.addEventListener("mouseover", () => {
          if (isDrawing) {
            addPoint(point);
          }
        });
      });
    }

    // Evento de fim de desenho (mouse)
    document.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  }

  // Inicializa os eventos do padrão quando a tela é carregada
  setupPatternEvents();

  // Função para rolar os cards automaticamente
  function autoScrollCards() {
    const container = document.getElementById('card-container'); // Contêiner dos cards
    const wrapper = document.getElementById('card-wrapper'); // Wrapper dos cards

    if (container && wrapper) {
      const cardWidth = 200; // Largura aproximada de cada card (ajuste conforme necessário)
      let scrollAmount = 0; // Quantidade de rolagem acumulada

      setInterval(() => {
        // Calcula a próxima posição de rolagem
        scrollAmount += cardWidth;

        // Verifica se atingiu o final dos cards
        if (scrollAmount >= wrapper.scrollWidth - container.clientWidth) {
          scrollAmount = 0; // Volta ao início
        }

        // Aplica a rolagem suavemente
        container.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }, 3000); // Intervalo de 3 segundos
    }
  }

  // Inicia a rolagem automática
  autoScrollCards();

  // Lógica do perfil do usuário
  const fotoPerfilSalva = localStorage.getItem('fotoPerfil');
  const fotoPerfilContainer = document.getElementById('fotoPerfilContainer');
  const iconePerfil = document.getElementById('iconePerfil');
  const inputFotoPerfil = document.getElementById('inputFotoPerfil');

  if (fotoPerfilSalva && fotoPerfilContainer && iconePerfil) {
    // Se houver uma foto salva, exibe-a no lugar do ícone
    fotoPerfilContainer.style.backgroundImage = `url(${fotoPerfilSalva})`;
    iconePerfil.classList.add('hidden'); // Oculta o ícone de perfil
  }

  if (inputFotoPerfil) {
    inputFotoPerfil.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Salva a foto no localStorage
          localStorage.setItem('fotoPerfil', e.target.result);
          // Exibe a foto no container
          if (fotoPerfilContainer) {
            fotoPerfilContainer.style.backgroundImage = `url(${e.target.result})`;
          }
          if (iconePerfil) {
            iconePerfil.classList.add('hidden'); // Oculta o ícone de perfil
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

// Funções para abrir redes sociais
function abrirWhatsApp() {
  window.open("https://api.whatsapp.com/send/?phone=5581991152307&text&type=phone_number&app_absent=0", "_blank");
}

function abrirFacebook() {
  window.open("https://www.facebook.com/hospitalguararapes/?locale=pt_BR", "_blank");
}

function abrirInstagram() {
  window.open("https://www.instagram.com/guararapeshospital/#", "_blank");
}