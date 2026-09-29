document.addEventListener('DOMContentLoaded', function() {
 
/* ==========================================================================
     1. CONTROLE DA MÚSICA DE FUNDO
     ========================================================================== */
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  if (bgMusic && musicBtn) {
    const musicIcon = musicBtn.querySelector('i');

    function toggleMusic() {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicBtn.classList.add('playing');
          musicIcon.className = 'fa-solid fa-pause';
        }).catch((error) => {
          console.error("Erro ao tocar áudio:", error);
          alert("Não foi possível carregar a música. Verifique se o arquivo 'audio/all-of-me.mp3' está na pasta correta.");
        });
      } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicIcon.className = 'fa-solid fa-music';
      }
    }

    // Clique no botão de música
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });

    // Inicia na primeira interação do usuário na página
    const startAudioOnInteraction = () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicBtn.classList.add('playing');
          musicIcon.className = 'fa-solid fa-pause';
        }).catch(() => {
          // Autoplay bloqueado pelo navegador até o clique direto
        });
      }
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
  }
