<template>
  <div class="container">
    <header>
      <h1>ToDo Nuxt 📝</h1>
      <p>Backend en memoria + JavaScript</p>
    </header>

    <!-- Formulario para agregar tareas -->
    <div class="input-group">
      <input 
        v-model="newTask" 
        @keyup.enter="addTodo" 
        type="text" 
        placeholder="¿Qué tienes pendiente?" 
      />
      <button @click="addTodo" class="btn-add">Agregar</button>
    </div>

    <!-- Lista de tareas -->
    <div class="todo-list">
      <div v-if="todos.length === 0" class="empty-state">
        No hay tareas aún. ¡Empieza por agregar una!
      </div>

      <div 
        v-for="todo in todos" 
        :key="todo.id" 
        class="todo-item"
        :class="{ 'is-completed': todo.completed }"
      >
        <!-- Marcar como realizada -->
        <input 
          type="checkbox" 
          :checked="todo.completed" 
          @change="updateTodo(todo.id, { completed: !todo.completed })" 
        />
        
        <!-- Texto de la tarea (se puede modificar al hacer clic) -->
        <span 
          class="todo-text" 
          contenteditable="true"
          @blur="e => updateTodo(todo.id, { text: e.target.innerText })"
        >
          {{ todo.text }}
        </span>

        <div class="actions">
          <!-- Marcar como favorita -->
          <button 
            @click="updateTodo(todo.id, { favorite: !todo.favorite })" 
            class="btn-fav"
            :class="{ 'active': todo.favorite }"
          >
            {{ todo.favorite ? '★' : '☆' }}
          </button>

          <!-- Eliminar -->
          <button @click="deleteTodo(todo.id)" class="btn-delete">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Variables reactivas
const newTask = ref('');

// useFetch conecta directamente con tu backend en server/api/todos.js
const { data: todos, refresh } = await useFetch('/api/todos');

// Función para agregar
const addTodo = async () => {
  if (!newTask.value.trim()) return;
  
  await $fetch('/api/todos', {
    method: 'POST',
    body: { text: newTask.value }
  });
  
  newTask.value = ''; // Limpiar input
  refresh(); // Refrescar lista
};

// Función para actualizar (realizada, favorita o texto)
const updateTodo = async (id, changes) => {
  await $fetch('/api/todos', {
    method: 'PATCH',
    body: { id, ...changes }
  });
  refresh();
};

// Función para eliminar
const deleteTodo = async (id) => {
  if (!confirm('¿Seguro que quieres eliminar esta tarea?')) return;
  
  await $fetch('/api/todos', {
    method: 'DELETE',
    body: { id }
  });
  refresh();
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

header { text-align: center; margin-bottom: 30px; }
h1 { color: #2c3e50; margin: 0; }

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
}

input[type="text"]:focus { border-color: #42b883; }

.btn-add {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.todo-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  gap: 12px;
  transition: transform 0.2s;
}

.todo-item:hover { transform: translateX(5px); }

.todo-text {
  flex: 1;
  font-size: 16px;
}

.is-completed .todo-text {
  text-decoration: line-through;
  color: #a0a0a0;
}

.actions { display: flex; gap: 5px; }

.btn-fav {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ccc;
}

.btn-fav.active { color: #f1c40f; }

.btn-delete {
  background: #ff7675;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
</style>