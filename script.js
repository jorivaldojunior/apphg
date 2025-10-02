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
        initPatternLock();
      }
    });
  }

  // Sistema de desenho do padrão
  function initPatternLock() {
    const points = document.querySelectorAll("[data-point]");
    const linesContainer = document.getElementById("linesContainer");
    const patternContainer = document.querySelector('.pattern-container');
    let selectedPoints = [];
    let isDrawing = false;
    let lastPoint = null;

    // Limpa as linhas anteriores e reseta os pontos
    linesContainer.innerHTML = '';
    points.forEach(point => {
      point.classList.remove("active");
    });
    selectedPoints = [];

    // Função para verificar se os pontos 1, 2 e 3 foram selecionados
    function checkPattern() {
      const requiredPoints = [1, 2, 3];
      const isPatternCorrect = requiredPoints.every(point => selectedPoints.includes(point));

      if (isPatternCorrect && selectedPoints.length >= 3) {
        // Feedback visual de sucesso
        points.forEach(point => {
          if (selectedPoints.includes(parseInt(point.getAttribute("data-point")))) {
            point.style.backgroundColor = "#15803d";
          }
        });

        // Redireciona para index1.html após um breve delay
        setTimeout(() => {
          window.location.href = "index1.html";
        }, 500);
      }
    }

    // Função para adicionar um ponto à lista de selecionados
    function addPoint(point) {
      const pointNumber = parseInt(point.getAttribute("data-point"));

      // Adiciona o ponto à lista de selecionados (se ainda não estiver)
      if (!selectedPoints.includes(pointNumber)) {
        selectedPoints.push(pointNumber);
        point.classList.add("active");

        // Desenha linha se houver ponto anterior
        if (lastPoint) {
          drawLine(lastPoint, point);
        }

        lastPoint = point;
      }

      // Verifica o padrão
      checkPattern();
    }

    // Função para desenhar linha entre dois pontos
    function drawLine(fromPoint, toPoint) {
      const fromRect = fromPoint.getBoundingClientRect();
      const toRect = toPoint.getBoundingClientRect();
      
      const containerRect = linesContainer.getBoundingClientRect();
      
      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY = toRect.top + toRect.height / 2 - containerRect.top;
      
      const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
      const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
      
      const line = document.createElement('div');
      line.className = 'line';
      line.style.width = distance + 'px';
      line.style.left = fromX + 'px';
      line.style.top = fromY + 'px';
      line.style.transform = `rotate(${angle}deg)`;
      
      linesContainer.appendChild(line);
    }

    // Função melhorada para detectar qual ponto está sendo tocado
    function getPointFromCoordinates(x, y) {
      // Cria um elemento temporário para as coordenadas
      const tempElement = document.createElement('div');
      tempElement.style.position = 'fixed';
      tempElement.style.left = x + 'px';
      tempElement.style.top = y + 'px';
      tempElement.style.width = '1px';
      tempElement.style.height = '1px';
      document.body.appendChild(tempElement);
      
      // Usa elementsFromPoint com as coordenadas exatas
      const elements = document.elementsFromPoint(x, y);
      document.body.removeChild(tempElement);
      
      for (let element of elements) {
        if (element.hasAttribute('data-point')) {
          return element;
        }
      }
      return null;
    }

    // Função para processar toque/movimento
    function processInteraction(x, y) {
      if (!isDrawing) return;
      
      const point = getPointFromCoordinates(x, y);
      if (point) {
        addPoint(point);
      }
    }

    // Eventos de toque para mobile
    patternContainer.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isDrawing = true;
      const touch = e.touches[0];
      const point = getPointFromCoordinates(touch.clientX, touch.clientY);
      if (point) {
        addPoint(point);
      }
    });

    patternContainer.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      processInteraction(touch.clientX, touch.clientY);
    });

    patternContainer.addEventListener('touchend', (e) => {
      e.preventDefault();
      isDrawing = false;
      lastPoint = null;
    });

    // Eventos de mouse para desktop
    patternContainer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDrawing = true;
      const point = getPointFromCoordinates(e.clientX, e.clientY);
      if (point) {
        addPoint(point);
      }
    });

    patternContainer.addEventListener('mousemove', (e) => {
      e.preventDefault();
      processInteraction(e.clientX, e.clientY);
    });

    patternContainer.addEventListener('mouseup', (e) => {
      e.preventDefault();
      isDrawing = false;
      lastPoint = null;
    });

    // Prevenir comportamento padrão de scroll
    patternContainer.addEventListener('touchstart', (e) => {
      if (e.target.closest('.pattern-container')) {
        e.preventDefault();
      }
    }, { passive: false });

    patternContainer.addEventListener('touchmove', (e) => {
      if (e.target.closest('.pattern-container')) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Funções para abrir redes sociais
  window.abrirWhatsApp = function() {
    window.open("https://api.whatsapp.com/send/?phone=5581991152307&text&type=phone_number&app_absent=0", "_blank");
  }

  window.abrirFacebook = function() {
    window.open("https://www.facebook.com/hospitalguararapes/?locale=pt_BR", "_blank");
  }

  window.abrirInstagram = function() {
    window.open("https://www.instagram.com/guararapeshospital/#", "_blank");
  }
});