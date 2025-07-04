<template>
  <div>
    <h1>Músicas</h1>
   <div class="externo"> 
    <table>

      <thead>
        <tr>
          <th>Nome</th>
          <th>Música</th>
          <th></th>
        </tr>
      </thead>

      <tbody>

        <tr v-for="(music, index) in frontend_madureira" :key="music.id">
          <td>{{ music.name }}</td>
          <td>{{ music.music }}</td>
          <td>
            <button @click="deleteMusic(index)" class="delete-Task">&times;</button>
          </td>
        </tr>

      </tbody>

    </table>
   </div>
  </div>
</template>

<script>
import Musica from '../services/musica'
 
  export default {
  data() {
    return {
      frontend_madureira: [],
    };
  },

  methods: {
    // excluir música
    async deleteMusic(index) { 
      try {
        const musicId = this.frontend_madureira[index].id;
        await Musica.excluir(musicId);
      } catch (error) {
        console.error('Erro ao excluir música:', error);
        return;
      } 
      this.frontend_madureira.splice(index, 1);
    },
  },

  // api
  mounted() {
    Musica.listar().then((resposta) => {
      console.log(resposta.data);
      this.frontend_madureira = resposta.data;
    });
  }
};
</script>

<style>
   body{                                                                                               
    margin: 0;
    font-family: Arial,sans-serif;
    background: linear-gradient(to bottom, black, blue);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 20px;
   }

   h1{
     text-align: center;
     color: white;
   }

   table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 60px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
   }

   thead {
    background-color: #4f48e5;
    color: white;
   }

   th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1 px solid #ccc;
   }

   tbody tr:hover{
    background-color: #f3f4f6;
   }

   .externo{
    margin-top: 60px;
    font-size: 20px;
    
   }

   button.delete-task {
    background-color: #ef4444;
    color: #ccc;
    border: none;
    border-radius: 50%;
    padding: 14px;
    font-size: 18px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 3 #4f48e5;
   }
</style>