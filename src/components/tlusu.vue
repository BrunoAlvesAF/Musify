<template>

 <div class="form-container">
   <div v-if="successMessage" class="toast-success">{{ successMessage }}</div>
   <h1>Madureira Music</h1>

   <form @submit.prevent="submitForm">
 <div>
   <label for="name" class="block text-sm">Nome</label>
   <input type="text" id="name" v-model="name" placeholder="seu nome" required>
 </div>
 <div>

   <label for="music" class="block text-sm">Música</label>
   <input type="text" id="music" v-model="music" placeholder="nome da música" required>
 </div>

 <button type="submit" :disabled="isSubmitting"
         class="{ 'btn-disabled': isSubmitting}"
 >Enviar</button>
 
 </form>
 </div>
 
</template>

<script>

import Musica from '../services/musica'

export default {
  data() {
    return {
      name: '',
      music: '',
      successMessage: '',
      isSubmitting: false,
    };
  },
  methods: {
    async submitForm() {
      if (!this.name.trim() || !this.music.trim() || this.isSubmitting) return;

      this.isSubmitting = true;

      try {
        await Musica.criar({
          name: this.name.trim(),
          music: this.music.trim(),
        });

        this.successMessage = 'Enviado com sucesso!';
        this.name = '';
        this.music = '';

        this.$emit('music-added');

      } catch (error) {
        console.error('Erro ao enviar:', error);
        this.successMessage = 'Erro ao enviar música.';
      } finally {
        setTimeout(() => {
          this.successMessage = '';
          this.isSubmitting = false;
        }, 3000);
      }
    },
  },
};
</script>

<style scoped lang="css">

 .form-container {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.774), rgb(8, 8, 129));
   padding: 20px;
   border-radius: 8px;   
   box-shadow: 0 4px 8px rgba(32, 22, 22, 0.3);
   max-height: 600px;
   width: 90%;
   padding: 20px;
   text-align: center;
 }

 .form-container input::placeholder{
   color: rgba(255, 255, 255, 0.7);
   font-size: 15px;
 }

 .form-container h1 {
   width: 90%;
   padding: 10px;
   margin: 8px 0;
   border-radius: 5px;
   border:none;
   background-color: rgba(255, 255, 255, 0.1);
   color: white;
 }

 .form-container label{
   color: white;
   font-size: 20px;
 }

 .form-container input{
   width: 100%;
   padding: 10px;
   margin: 8px 0;
   border-radius: 5px;
   border: none;
   background-color: rgba(255, 255, 255, 0.2);
   color: white; 
   font-size: 16px;
}

 .form-container button{
   width: 100%;
   padding: 10px;
   background-color: #ff4081;
   border: none;
   margin: 1rem 0;
   border-radius: 7px;
   color: white;
   cursor: pointer;
   font-size: 16px;
 }

 .form-container button:hover {
   background-color: #e91e63;
 }

 input[type="text"]{
   width: 100%;
   padding: 8px;
   box-sizing: border-box;
   border: 1px solid #ccc;
   border-radius: 4px;
 }

 button:disabled {
  cursor: not-allowed;
 }

 .btn-disabled {
  background-color: #9ca3af;
 }

 .toast-success {
   position: fixed;
   top: 20px;
   right: 20px;
   background-color: #4caf50;
   color: white;
   padding: 20px 20px;
   border-radius: 5px;
 }
</style>