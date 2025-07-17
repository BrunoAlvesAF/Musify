<template>
  <div class="app-container">
    <div class="form-card">
      <div class="header">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="music-icon">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <h1>AD Musify</h1>
        </div>
        <p class="subtitle">Envie seu louvor para a equipe de som</p>
      </div>

      <form @submit.prevent="submitForm" class="form-content">
        <div class="input-field">
          <label for="name">Seu nome completo</label>
          <input type="text" id="name" v-model="form.name" placeholder="Ex: Irmão João" required />
          <div class="underline"></div>
        </div>

        <div class="input-field">
          <label for="music">Música para playback</label>
          <input type="text" id="music" v-model="form.music" placeholder="Ex: Canção do Céu - Ministério Zoe" required />
          <div class="underline"></div>
        </div>

        <div class="form-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          <p>Sua solicitação será enviada diretamente para a equipe de som</p>
        </div>

        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          <span v-if="!isSubmitting">Solicitar playback</span>
          <span v-else class="loading">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            Enviando...
          </span>
        </button>
      </form>

      <!-- Seção de Histórico com Paginação -->
      <div class="music-list-container" v-if="musicas.length > 0">
        <div class="music-list-header">
          <h3 class="music-list-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path d="M14 13c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path fill-rule="evenodd" d="M6 3v10h1V3H6z"/>
              <path fill-rule="evenodd" d="M9 3v10h1V3H9zm3 0v10h1V3h-1z"/>
              <path fill-rule="evenodd" d="M5 4h7v1H5V4zm0 3h7v1H5V7zm0 3h3v1H5v-1z"/>
            </svg>
            Histórico de Pedidos
          </h3>
          
          <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">
              &lt;
            </button>
            <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">
              &gt;
            </button>
          </div>
        </div>
        
        <div class="music-list">
          <div v-for="musica in paginatedMusicas" :key="musica.id" class="music-item">
            <div class="music-info">
              <h4>{{ musica.music }}</h4>
              <p class="music-author">Enviado por: {{ musica.name }}</p>
              <p class="music-meta">
                <span>{{ formatDate(musica.timestamp) }}</span>
                <span>•</span>
                <span>{{ musica.louvores || 0 }} louvores</span>
              </p>
            </div>
            <div class="music-actions">
              <button @click="shareMusic(musica)" class="action-btn" title="Compartilhar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                </svg>
              </button>
              <button @click="deleteMusic(musica.id)" class="delete-btn" title="Apagar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
              <button @click="louvarMusica(musica.id)" class="louvar-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                Curti
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>&copy; {{ currentYear }} AD Musify. Todos os direitos reservados.</p>
        <p class="developer">Desenvolvido por Bruno Alvez</p>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Pedido Enviado com Sucesso!</h3>
        <p>Sua música <strong>{{ lastSubmittedMusic }}</strong> foi registrada.</p>
        <div class="modal-actions">
          <button @click="closeModal" class="modal-btn">Fechar</button>
          <button @click="shareLastMusic" class="modal-btn primary">Compartilhar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        music: ''
      },
      isSubmitting: false,
      musicas: [],
      currentPage: 1,
      itemsPerPage: 5,
      showModal: false,
      lastSubmittedMusic: '',
      currentYear: new Date().getFullYear()
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.musicas.length / this.itemsPerPage);
    },
    paginatedMusicas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.musicas.slice(start, end);
    }
  },
  created() {
    this.carregarMusicas();
  },
  methods: {
    carregarMusicas() {
      const savedMusicas = localStorage.getItem('musicas');
      if (savedMusicas) {
        this.musicas = JSON.parse(savedMusicas);
      }
    },
    salvarMusicas() {
      localStorage.setItem('musicas', JSON.stringify(this.musicas));
    },
    async submitForm() {
      if (!this.form.name.trim() || !this.form.music.trim() || this.isSubmitting) return;

      this.isSubmitting = true;

      try {
        const novaMusica = {
          id: Date.now(),
          name: this.form.name.trim(),
          music: this.form.music.trim(),
          timestamp: Date.now(),
          louvores: 0
        };

        this.musicas.unshift(novaMusica);
        this.salvarMusicas();
        
        this.lastSubmittedMusic = novaMusica.music;
        this.showModal = true;
        
        const mensagem = `Paz do Senhor!\nNome: ${novaMusica.name}\nMúsica: ${novaMusica.music}`;
        this.form.name = '';
        this.form.music = '';

        const numeroWhatsapp = '5588993085560';
        const link = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
        window.open(link, '_blank');

      } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Erro ao enviar música. Por favor, tente novamente.');
      } finally {
        this.isSubmitting = false;
      }
    },
    louvarMusica(id) {
      this.musicas = this.musicas.map(musica => {
        if (musica.id === id) {
          return {
            ...musica,
            louvores: (musica.louvores || 0) + 1
          };
        }
        return musica;
      });
      this.salvarMusicas();
    },
    shareMusic(musica) {
      const text = `Olá, estou louvando com: ${musica.music} (Enviado por ${musica.name})`;
      if (navigator.share) {
        navigator.share({
          title: 'AD Musify - Louvor',
          text: text,
          url: window.location.href
        }).catch(err => {
          console.log('Erro ao compartilhar:', err);
          this.copyToClipboard(text);
        });
      } else {
        this.copyToClipboard(text);
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado para a área de transferência!');
      }).catch(err => {
        console.error('Erro ao copiar:', err);
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Texto copiado!');
      });
    },
    deleteMusic(id) {
      if (confirm('Tem certeza que deseja apagar esta música do histórico?')) {
        this.musicas = this.musicas.filter(musica => musica.id !== id);
        this.salvarMusicas();
        
        if (this.paginatedMusicas.length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    closeModal() {
      this.showModal = false;
    },
    shareLastMusic() {
      this.shareMusic({
        music: this.lastSubmittedMusic,
        name: this.musicas.find(m => m.music === this.lastSubmittedMusic)?.name || ''
      });
      this.closeModal();
    }
  }
};
</script>

<style>
 :root {
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --primary-light: #6366f1;
  --background-dark: #0f0f1f;
  --background-light: #1e1e2f;
  --card-bg: rgba(255, 255, 255, 0.05);
  --text: #ffffff;
  --text-light: rgba(255, 255, 255, 0.7);
  --text-lighter: rgba(255, 255, 255, 0.5);
  --border: rgba(255, 255, 255, 0.1);
  --success: #10b981;
  --error: #ef4444;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to bottom, var(--background-dark), var(--background-light));
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 1rem;
  padding-top: 2rem;
}

.form-card {
  width: 100%;
  max-width: 480px;
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  margin-bottom: 1rem;
}

.header {
  padding: 1.5rem 1rem 0.75rem;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.music-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: var(--primary);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: white;
}

.subtitle {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 400;
  line-height: 1.4;
  padding: 0 0.5rem;
}

.form-content {
  padding: 1.5rem 1rem;
}

.input-field {
  margin-bottom: 1.25rem;
  position: relative;
}

.input-field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.input-field input {
  width: 100%;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  border: none;
  border-bottom: 1px solid var(--border);
  background-color: transparent;
  transition: border-color 0.3s ease;
  color: white;
}

.input-field input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-field input::placeholder {
  color: var(--text-light);
  opacity: 0.7;
  font-size: 0.9rem;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.input-field input:focus ~ .underline {
  width: 100%;
}

.form-info {
  margin: 1.25rem 0;
  padding: 0.75rem;
  background-color: rgba(79, 70, 229, 0.1);
  border-radius: 8px;
  font-size: 0.8rem;
  text-align: left;
  color: var(--text-light);
  border-left: 3px solid var(--primary);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.form-info svg {
  flex-shrink: 0;
  margin-top: 0.1rem;
  color: var(--primary);
}

.submit-btn {
  width: 100%;
  padding: 0.9rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 18px;
  height: 18px;
}

.spinner .path {
  stroke: white;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

/* lista de músicas */
.music-list-container {
  padding: 1rem;
  border-top: 1px solid var(--border);
}

.music-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.music-list-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--primary);
  margin: 0;
}

.music-list-icon {
  color: var(--primary);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
}

.page-info {
  font-size: 0.8rem;
  color: var(--text-light);
}

.music-list {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.music-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.music-info h4 {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: var(--text);
}

.music-author {
  font-size: 0.8rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.music-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-lighter);
}

.music-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  border: 1px solid var(--primary);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.delete-btn {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
  border: 1px solid var(--error);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: var(--error);
  color: white;
}

.delete-btn svg {
  width: 14px;
  height: 14px;
}

.louvar-btn {
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  border: 1px solid var(--primary);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.louvar-btn:hover {
  background: var(--primary);
  color: white;
}

.louvar-btn svg {
  width: 14px;
  height: 14px;
}

/* Estilos para o modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: var(--background-light);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
}

.modal h3 {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.modal p {
  margin-bottom: 1.5rem;
  color: var(--text-light);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.modal-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.modal-btn.primary {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.modal-btn.primary:hover {
  background: var(--primary-dark);
}

/* Footer */
.footer {
  padding: 1rem 0.5rem;
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-light);
  border-top: 1px solid var(--border);
}

.developer {
  margin-top: 0.5rem;
  font-size: 0.65rem;
  opacity: 0.8;
}

/* Scroll personalizada */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 3px;
}

/* Animações */
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* Responsividade */
@media (max-width: 480px) {
  .app-container {
    padding: 0.5rem;
    padding-top: 1rem;
    align-items: flex-start;
  }

  .form-card {
    min-width: 320px;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }

  .header {
    padding: 1.25rem 0.75rem 0.5rem;
  }

  .logo h1 {
    font-size: 1.4rem;
  }

  .form-content {
    padding: 1.25rem 0.75rem;
  }

  .input-field input {
    font-size: 0.9rem;
    padding: 0.6rem 0;
  }

  .submit-btn {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  .form-info {
    font-size: 0.75rem;
    padding: 0.6rem;
  }

  .music-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .music-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .pagination-controls {
    margin-top: 0.5rem;
    justify-content: center;
    width: 100%;
  }
  
  .music-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .modal {
    width: 90%;
    padding: 1rem;
  }

  .modal-actions {
    justify-content: center;
  }
}

@media (max-width: 360px) {
  .logo h1 {
    font-size: 1.3rem;
  }
  
  .subtitle {
    font-size: 0.75rem;
  }
  
  .input-field label {
    font-size: 0.75rem;
  }
  
  .footer {
    font-size: 0.65rem;
  }
}
</style>