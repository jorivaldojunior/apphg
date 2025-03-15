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
      }
    });
  }

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
  if (points.length > 0) {
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
  }

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
      }, 6000); // Intervalo de 6 segundos
    }
  }

  // Inicia a rolagem automática
  autoScrollCards();

  // Lógica do perfil do usuário
  const fotoPerfilSalva = localStorage.getItem('fotoPerfil');
  const fotoPerfilContainer = document.getElementById('fotoPerfilContainer');
  const iconePerfil = document.getElementById('iconePerfil');
  const inputFotoPerfil = document.getElementById('inputFotoPerfil');
  const modalPerfil = document.getElementById('modalPerfil');

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
          fecharModalPerfil(); // Fecha o modal após adicionar a foto
        };
        reader.readAsDataURL(file);
      }
    });
  }
});


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
      }
    });
  }

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
  if (points.length > 0) {
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
  }

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
      }, 6000); // Intervalo de 6 segundos
    }
  }

  // Inicia a rolagem automática
  autoScrollCards();

  // Lógica do perfil do usuário
  const fotoPerfilSalva = localStorage.getItem('fotoPerfil');
  const fotoPerfilContainer = document.getElementById('fotoPerfilContainer');
  const iconePerfil = document.getElementById('iconePerfil');
  const inputFotoPerfil = document.getElementById('inputFotoPerfil');
  const modalPerfil = document.getElementById('modalPerfil');

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
          fecharModalPerfil(); // Fecha o modal após adicionar a foto
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

// Função para carregar a foto de perfil salva
function carregarFotoPerfil() {
  const fotoPerfilSalva = localStorage.getItem('fotoPerfil');
  const fotoPerfilContainer = document.getElementById('fotoPerfilContainer');
  const iconePerfil = document.getElementById('iconePerfil');

  if (fotoPerfilSalva && fotoPerfilContainer && iconePerfil) {
    // Se houver uma foto salva, exibe-a no lugar do ícone
    fotoPerfilContainer.style.backgroundImage = `url(${fotoPerfilSalva})`;
    iconePerfil.classList.add('hidden'); // Oculta o ícone de perfil
  }
}

// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarFotoPerfil);