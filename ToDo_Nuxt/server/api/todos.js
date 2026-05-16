// server/api/todos.js

// Esta variable vive en el proceso del servidor (en memoria)
// Si reinicias el servidor en la consola, estos datos se borrarán
let todos = []; 
let idCounter = 1;

export default defineEventHandler(async (event) => {
  // Detectamos qué tipo de operación quiere hacer el Frontend
  const method = event.method;

  // 1. OBTENER TAREAS (GET)
  if (method === 'GET') {
    return todos;
  }

  // 2. CREAR TAREA (POST)
  if (method === 'POST') {
    const body = await readBody(event);
    const newTodo = {
      id: idCounter++,
      text: body.text,
      completed: false,
      favorite: false
    };
    todos.push(newTodo);
    return newTodo;
  }

  // 3. ACTUALIZAR TAREA (PATCH)
  // Sirve para marcar como realizada, favorita o editar el texto
  if (method === 'PATCH') {
    const body = await readBody(event);
    const index = todos.findIndex(t => t.id === body.id);
    
    if (index !== -1) {
      // Fusionamos los cambios que vengan en el body con la tarea existente
      todos[index] = { ...todos[index], ...body };
      return { success: true, todo: todos[index] };
    }
    
    throw createError({
      statusCode: 404,
      statusMessage: 'Tarea no encontrada',
    });
  }

  // 4. ELIMINAR TAREA (DELETE)
  if (method === 'DELETE') {
    const body = await readBody(event);
    todos = todos.filter(t => t.id !== body.id);
    return { success: true };
  }
});