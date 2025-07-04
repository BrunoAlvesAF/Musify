<template>
  <nav>
    <router-link to="/tlusu">Tela Usuário</router-link> |
    <router-link to="/usua">Usuário</router-link>
  </nav>

  <router-view />
</template>


<script>
 import tlusu from './components/tlusu.vue';
 
  export default {
    name: 'App'
  };
</script>

<style scoped="css">
 /*testando
 nav {
  display: none;
 }
 */
 </style>