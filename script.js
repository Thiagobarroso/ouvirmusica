document.addEventListener("DOMContentLoaded", function () {
  const meuAudio = document.getElementById("meuAudio");
  const botaoPlay = document.getElementById("botaoPlay");
  const progressoAtual = document.getElementById("progresso-atual");

  botaoPlay.addEventListener("click", function () {
    if (meuAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  });

  meuAudio.addEventListener("timeupdate", function () {
    const porcentagemConcluida =
      (meuAudio.currentTime / meuAudio.duration) * 100;
    progressoAtual.style.width = porcentagemConcluida + "%";
  });

  function playAudio() {
    meuAudio.play();
    updatePlayButton();
  }

  function pauseAudio() {
    meuAudio.pause();
    updatePlayButton();
  }

  function updatePlayButton() {
    const icon = meuAudio.paused
      ? "assets/imagens/btn-player.png"
      : "assets/imagens/btn-pause.png";
    botaoPlay.innerHTML = `<img src="${icon}" alt="Play/Pause">`;
  }
});

/*  TEMPO MUSICA */
document.addEventListener("DOMContentLoaded", function () {
  const meuAudio = document.getElementById("meuAudio");
  const tempoTotalElemento = document.getElementById("tempoTotal");
  const tempoAtualElemento = document.getElementById("tempoAtual");
  const botaoPlay = document.getElementById("botaoPlay");
  const botaoAnterior = document.getElementById("botaoAnterior");
  const botaoProximo = document.getElementById("botaoProximo");
  const imagemMusica = document.getElementById("imagemMusica");
  const paragrafoMusica = document.getElementById("paragrafoMusica");
  const tituloMusica = document.getElementById("tituloMusica");

  let listaDeMusicas;
  let musicaAtualIndex = 0;

  fetch("musicas.json")
    .then((response) => response.json())
    .then((data) => {
      listaDeMusicas = data;
      trocarMusica();
    });

  botaoPlay.addEventListener("click", function () {
    if (meuAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  });

  botaoAnterior.addEventListener("click", function () {
    musicaAtualIndex =
      (musicaAtualIndex - 1 + listaDeMusicas.length) % listaDeMusicas.length;
    trocarMusica();
  });

  botaoProximo.addEventListener("click", function () {
    musicaAtualIndex = (musicaAtualIndex + 1) % listaDeMusicas.length;
    trocarMusica();
  });

  botaoAnterior.addEventListener("click", function () {
    meuAudio.play();
  });

  botaoProximo.addEventListener("click", function () {
    meuAudio.play();
  });

  meuAudio.addEventListener("loadedmetadata", function () {
    const duracaoTotal = formatarTempo(meuAudio.duration);
    tempoTotalElemento.innerText = duracaoTotal;
  });

  meuAudio.addEventListener("timeupdate", function () {
    const tempoAtual = formatarTempo(meuAudio.currentTime);
    tempoAtualElemento.innerText = tempoAtual;
  });

  function trocarMusica() {
    const musicaAtual = listaDeMusicas[musicaAtualIndex];
    meuAudio.src = musicaAtual.caminho;
    imagemMusica.src = musicaAtual.imagem;
    tituloMusica.innerText = musicaAtual.titulo;
    paragrafoMusica.innerText = musicaAtual.paragrafo;
  }

  //listrar musicas
  const albunsList = document.querySelector(".albuns-itens");
  

  fetch("musicas.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((musica) => {
        const li = document.createElement("li");
        const imagem = document.createElement("img");
        const albunsInfo = document.createElement("div");
        const titulo = document.createElement("h4");
        const ano = document.createElement("p");

        // Set attributes
        imagem.src = musica.imagem;
        albunsInfo.className = "albuns-info";
        titulo.textContent = musica.titulo;
        ano.textContent = musica.paragrafo;

        albunsInfo.appendChild(titulo);
        albunsInfo.appendChild(ano);

        li.appendChild(imagem);
        li.appendChild(albunsInfo);

        albunsList.appendChild(li);

        li.addEventListener("click", function () {
          const musicaAtual = listaDeMusicas[musicaAtualIndex];
          meuAudio.src = musica.caminho;
          imagemMusica.src = musica.imagem;
          tituloMusica.innerText = musica.titulo;
          paragrafoMusica.innerText = musica.paragrafo;
          meuAudio.play();
        });
      });
    });

  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    const segundosFormatados =
      segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
    return `${minutos}:${segundosFormatados}`;
  }
});
