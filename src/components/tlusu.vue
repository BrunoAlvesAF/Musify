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
          <input type="text" id="name" v-model="name" placeholder="Ex: Irmão João" required />
          <div class="underline"></div>
        </div>

        <div class="input-field">
          <label for="music">Música para playback</label>
          <input type="text" id="music" v-model="music" placeholder="Ex: Canção do Céu - Ministério Zoe" required />
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
      
      <div class="footer">
        <p>&copy; 2025 AD Musify. Todos os direitos reservados.</p>
        <p class="developer">Desenvolvido por Bruno Alves</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      name: '',
      music: '',
      isSubmitting: false,
    };
  },
  methods: {
    async submitForm() {
      if (!this.name.trim() || !this.music.trim() || this.isSubmitting) return;

      this.isSubmitting = true;

      try {
        const nome = this.name.trim();
        const musica = this.music.trim();

        //await Musica.criar({ name: nome, music: musica });

        this.$emit('music-added');

        const mensagem = `Paz do Senhor!\nNome: ${nome}\nMúsica: ${musica}`;
        this.name = '';
        this.music = '';

        const numeroWhatsapp = '5588993085560';
        const link = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
        window.location.href = link;

      } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Erro ao enviar música. Por favor, tente novamente.');
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

:root {
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --background-dark: #0f0f1f;
  --background-light: #1e1e2f;
  --card-bg: rgba(255, 255, 255, 0.05);
  --text: #ffffff;
  --text-light: rgba(255, 255, 255, 0.7);
  --border: rgba(255, 255, 255, 0.1);
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
  -webkit-text-size-adjust: 100%;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.form-card {
  width: 100%;
  max-width: 480px;
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0.5rem;
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

.footer {
  padding: 1rem 0.5rem;
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-light);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.developer {
  margin-top: 0.5rem;
  font-size: 0.65rem;
  opacity: 0.8;
}

/*  para mobile */
@media (max-width: 480px) {
  .app-container {
    padding: 0.5rem;
    align-items: flex-start;
    padding-top: 1.5rem;
  }

  .form-card {
    border-radius: 12px;
    margin: 0;
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
</style>