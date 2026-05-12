<template>
  <div class="main-layout">
    <section class="seccion-contador">
      <h1>Panel de Control</h1>
      <div class="contador-box">
        <p>Contador actual: <strong>{{ contador }}</strong></p>
        <button @click="decrementar">-</button>
        <button @click="incrementar">+</button>
      </div>
    </section>

    <hr />

    <section class="seccion-pokemon">
      <h2>Información del Pokémon</h2>
      <Card /> 
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// IMPORTANTE: Importamos el componente hijo
import Card from './Card.vue'

// Lógica del contador
const contador = ref(0)
const incrementar = () => contador.value++
const decrementar = () => contador.value--
</script>

<style scoped>
.main-layout {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
  color: white;
  padding: 20px;
}

.contador-box {
  background: #34495e;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.contador-box button {
  font-size: 20px;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #42b883;
  color: white;
}

hr {
  border: 0;
  height: 1px;
  background: #444;
  margin: 40px 0;
}

h1, h2 {
  color: #42b883;
}
</style>