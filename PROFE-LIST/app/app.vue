<template>
  <div class="app-wrapper">
    <!-- Sidebar de Navegación -->
    <nav class="sidebar">
      <div class="sidebar-header">
        <h2>PROFE-LIST 👨‍🏫</h2>
      </div>
      <div class="menu">
        <button :class="{ active: view === 'dashboard' }" @click="view = 'dashboard'">📊 Dashboard</button>
        <button :class="{ active: view === 'grupos' }" @click="view = 'grupos'">📁 Grupos</button>
        <button :class="{ active: view === 'alumnos' }" @click="view = 'alumnos'">👨‍🎓 Alumnos</button>
      </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="content">
      
      <!-- VISTA: DASHBOARD -->
      <section v-if="view === 'dashboard'">
        <h1>Resumen de Asistencias</h1>
        <div v-if="stats && stats.length" class="stats-grid">
          <div v-for="s in stats" :key="s.grupo" class="stat-card">
            <h3>{{ s.grupo }}</h3>
            <div class="progress-bar">
              <div class="progress" :style="{ width: s.porcentaje + '%' }"></div>
            </div>
            <p><strong>{{ s.porcentaje }}%</strong> de asistencia</p>
            <small>{{ s.total_asistencias }} de {{ s.total_alumnos }} alumnos</small>
          </div>
        </div>
        <div v-else class="empty-state">
          No hay datos suficientes para mostrar estadísticas. Agrega grupos y alumnos primero.
        </div>
      </section>

      <!-- VISTA: GRUPOS (CRUD) -->
      <section v-if="view === 'grupos'">
        <h1>Gestión de Grupos</h1>
        <div class="form-box">
          <input v-model="newGrupoName" @keyup.enter="addGrupo" placeholder="Nombre del nuevo grupo (ej. 4to Semestre)" />
          <button @click="addGrupo" class="btn-primary">Crear Grupo</button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Grupo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in grupos" :key="g.id">
              <td>#{{ g.id }}</td>
              <td>{{ g.nombre }}</td>
              <td>
                <button class="btn-del" @click="delGrupo(g.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- VISTA: ALUMNOS (CRUD) -->
      <section v-if="view === 'alumnos'">
        <h1>Gestión de Alumnos</h1>
        <div class="form-box">
          <input v-model="newAlumnoName" placeholder="Nombre completo del alumno" />
          <select v-model="selectedGrupoId">
            <option :value="null" disabled>Selecciona un grupo</option>
            <option v-for="g in grupos" :key="g.id" :value="g.id">
              {{ g.nombre }}
            </option>
          </select>
          <button @click="addAlumno" class="btn-primary">Registrar Alumno</button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in alumnos" :key="a.id">
              <td>{{ a.nombre }}</td>
              <td><span class="badge">{{ a.nombre_grupo }}</span></td>
              <td>
                <button class="btn-del" @click="delAlumno(a.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado de la aplicación
const view = ref('dashboard');

// Variables para formularios
const newGrupoName = ref('');
const newAlumnoName = ref('');
const selectedGrupoId = ref(null);

// Carga reactiva de datos desde el backend (MySQL)
const { data: stats, refresh: refreshStats } = await useFetch('/api/stats');
const { data: grupos, refresh: refreshGrupos } = await useFetch('/api/grupos');
const { data: alumnos, refresh: refreshAlumnos } = await useFetch('/api/alumnos');

// --- ACCIONES PARA GRUPOS ---
const addGrupo = async () => {
  if (!newGrupoName.value.trim()) return;
  try {
    await $fetch('/api/grupos', {
      method: 'POST',
      body: { nombre: newGrupoName.value }
    });
    newGrupoName.value = '';
    await refreshGrupos();
    await refreshStats();
  } catch (e) {
    alert("Error al crear el grupo");
  }
};

const delGrupo = async (id) => {
  if (!confirm('¿Eliminar el grupo? Se borrarán todos sus alumnos y asistencias.')) return;
  await $fetch('/api/grupos', { method: 'DELETE', body: { id } });
  await refreshGrupos();
  await refreshAlumnos();
  await refreshStats();
};

// --- ACCIONES PARA ALUMNOS ---
const addAlumno = async () => {
  if (!newAlumnoName.value.trim() || !selectedGrupoId.value) {
    return alert('Por favor, ingresa el nombre y selecciona un grupo.');
  }
  try {
    await $fetch('/api/alumnos', {
      method: 'POST',
      body: { nombre: newAlumnoName.value, grupo_id: selectedGrupoId.value }
    });
    newAlumnoName.value = '';
    await refreshAlumnos();
    await refreshStats();
  } catch (e) {
    alert("Error al registrar alumno");
  }
};

const delAlumno = async (id) => {
  if (!confirm('¿Eliminar a este alumno?')) return;
  await $fetch('/api/alumnos', { method: 'DELETE', body: { id } }); // Requiere implementar DELETE en api/alumnos.js
  await refreshAlumnos();
  await refreshStats();
};
</script>

<style scoped>
/* Estilos base del Layout */
.app-wrapper { display: flex; height: 100vh; font-family: 'Segoe UI', system-ui, sans-serif; background: #f4f7f6; }

/* Sidebar Estilo Escritorio */
.sidebar { width: 260px; background: #1a252f; color: white; display: flex; flex-direction: column; }
.sidebar-header { padding: 30px 20px; text-align: center; border-bottom: 1px solid #2c3e50; }
.menu { padding: 10px; flex: 1; }
.menu button { 
  display: block; width: 100%; padding: 15px; margin-bottom: 5px; 
  background: transparent; border: none; color: #bdc3c7; 
  text-align: left; cursor: pointer; border-radius: 8px; transition: 0.3s;
}
.menu button:hover, .menu button.active { background: #34495e; color: white; }

/* Contenido */
.content { flex: 1; padding: 40px; overflow-y: auto; color: #2c3e50; }
h1 { margin-bottom: 30px; font-weight: 600; }

/* Formularios */
.form-box { display: flex; gap: 10px; margin-bottom: 30px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
input, select { padding: 12px; border: 1px solid #ddd; border-radius: 6px; flex: 1; outline: none; }
.btn-primary { background: #3498db; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; }

/* Dashboard Cards */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.stat-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #42b883; }
.progress-bar { background: #eee; height: 10px; border-radius: 5px; margin: 15px 0; overflow: hidden; }
.progress { background: #42b883; height: 100%; transition: width 0.8s ease-in-out; }

/* Tablas */
.data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.data-table th { background: #f8f9fa; padding: 15px; text-align: left; color: #7f8c8d; }
.data-table td { padding: 15px; border-top: 1px solid #eee; }
.badge { background: #ebf5ff; color: #3498db; padding: 4px 10px; border-radius: 4px; font-size: 0.85em; font-weight: bold; }
.btn-del { background: #ff7675; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9em; }
.btn-del:hover { background: #d63031; }

.empty-state { text-align: center; padding: 50px; color: #95a5a6; }
</style>