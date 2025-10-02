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

    // Função para detectar qual ponto está sendo tocado
    function getPointFromTouch(touch) {
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
      for (let element of elements) {
        if (element.hasAttribute('data-point')) {
          return element;
        }
      }
      return null;
    }

    // Eventos de toque
    document.addEventListener('touchstart', (e) => {
      if (e.target.closest('.pattern-container')) {
        e.preventDefault();
        isDrawing = true;
        const point = getPointFromTouch(e.touches[0]);
        if (point) {
          addPoint(point);
        }
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (isDrawing) {
        e.preventDefault();
        const point = getPointFromTouch(e.touches[0]);
        if (point) {
          addPoint(point);
        }
      }
    });

    document.addEventListener('touchend', () => {
      isDrawing = false;
      lastPoint = null;
    });

    // Eventos de mouse (para desktop)
    document.addEventListener('mousedown', (e) => {
      if (e.target.closest('.pattern-container')) {
        isDrawing = true;
        const point = getPointFromTouch(e);
        if (point) {
          addPoint(point);
        }
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isDrawing) {
        const point = getPointFromTouch(e);
        if (point) {
          addPoint(point);
        }
      }
    });

    document.addEventListener('mouseup', () => {
      isDrawing = false;
      lastPoint = null;
    });

    // Helper para elementosFromPoint com coordenadas do mouse
    function getPointFromTouch(touchOrMouse) {
      const x = touchOrMouse.clientX || touchOrMouse.pageX;
      const y = touchOrMouse.clientY || touchOrMouse.pageY;
      const elements = document.elementsFromPoint(x, y);
      for (let element of elements) {
        if (element.hasAttribute('data-point')) {
          return element;
        }
      }
      return null;
    }
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