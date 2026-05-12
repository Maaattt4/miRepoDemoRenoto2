<template>
  <div class="card-container">
    <div v-if="pokemon" class="pokemon-card">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      <h2>{{ pokemon.name.toUpperCase() }}</h2>
      <div class="stats">
        <span>Altura: {{ pokemon.height / 10 }} m</span>
        <span>Peso: {{ pokemon.weight / 10 }} kg</span>
      </div>
    </div>
    <div v-else>
      <p>Cargando Pokémon...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pokemon = ref(null)

// Función para obtener datos de la API
const obtenerPokemon = async () => {
  try {
    const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    const datos = await respuesta.json()
    pokemon.value = datos
  } catch (error) {
    console.error("Error al traer al pokemon:", error)
  }
}

// Ejecutar la función cuando el componente se carga
onMounted(() => {
  obtenerPokemon()
})
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.pokemon-card {
  background: white;
  color: #333;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  text-align: center;
  width: 250px;
}

.pokemon-card img {
  width: 150px;
  background: #f0f0f0;
  border-radius: 50%;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: bold;
  color: #666;
}
</style>