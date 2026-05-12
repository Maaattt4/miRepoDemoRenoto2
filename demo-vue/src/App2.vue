<template>
  <div class="formulario-container">
    <h2>Registro de Usuario</h2>
    
    <!-- Formulario de captura -->
    <div class="form-group">
      <input 
        v-model="nombre" 
        type="text" 
        placeholder="Escribe tu nombre"
      />
      <input 
        v-model="email" 
        type="email" 
        placeholder="Escribe tu correo"
      />
    </div>

    <!-- Sección de resultados en tiempo real -->
    <div class="card" v-if="nombre || email">
      <h3>Datos Capturados:</h3>
      <p><strong>Nombre:</strong> {{ nombre }}</p>
      <p><strong>Correo:</strong> {{ email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Definimos las variables reactivas para los campos
const nombre = ref('')
const email = ref('')
</script>

<style scoped>
.formulario-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.card {
  padding: 15px;
  background-color: #fff;
  border-left: 5px solid #42b883;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h2 {
  color: #2c3e50;
  text-align: center;
}

p {
  margin: 5px 0;
  color: #555;
}
</style>