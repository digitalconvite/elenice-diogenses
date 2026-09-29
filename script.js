document.addEventListener('DOMContentLoaded', function() {
  /* ==========================================================================
     1. CONFIRMAÇÃO DE PRESENÇA
     ========================================================================== */
  const modal = document.getElementById('rsvpModal');
  const openBtn = document.getElementById('rsvpBtn'); // ID exatamente igual ao seu HTML
  const closeBtn = document.getElementById('closeRsvpBtn');
  const rsvpForm = document.getElementById('rsvpForm');

  // Abrir o modal ao clicar em "Confirmar Presença"
  if (openBtn) {
    openBtn.addEventListener('click', function() {
      modal.style.display = 'flex';
    });
  }

  // Fechar o modal ao clicar em "Cancelar"
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // Fechar o modal se clicar fora da caixa branca
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Envio do formulário via WhatsApp
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Digite aqui o número do WhatsApp que vai receber os dados (DDD + número)
      const numeroWhatsapp = "556981361301"; 

      const nome = document.getElementById('nome').value;
      const celebracao = document.getElementById('presencaCelebracao').value;
      const recepcao = document.getElementById('presencaRecepcao').value;
      const acompanhantes = document.getElementById('acompanhantes').value;

      // Formatação da mensagem para o WhatsApp
      let mensagem = `*Confirmação de Presença - Casamento Diego & Giovana*\n\n`;
      mensagem += `👤 *Nome:* ${nome}\n`;
      mensagem += `⛪ *Celebração:* ${celebracao}\n`;
      mensagem += `🥂 *Recepção:* ${recepcao}\n`;
      mensagem += `👥 *Acompanhantes:* ${acompanhantes}`;

      // Monta e abre a URL no WhatsApp
      const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
      window.open(urlWhatsapp, '_blank');
    });
  }
});

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
