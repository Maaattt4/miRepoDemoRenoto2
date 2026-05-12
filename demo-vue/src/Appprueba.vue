<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Cambiar Mensaje</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hola Vue!'
    }
  },
  methods: {
    changeMessage() {
      this.message = 'Mensaje cambiado!'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>