export default defineEventHandler(async (event) => {
    const method = event.method;

    if (method === 'GET') {
        const [rows] = await pool.query(`
            SELECT a.*, g.nombre as nombre_grupo 
            FROM alumnos a 
            JOIN grupos g ON a.grupo_id = g.id
        `);
        return rows;
    }

    if (method === 'POST') {
        const body = await readBody(event);
        const [result] = await pool.query(
            'INSERT INTO alumnos (nombre, grupo_id) VALUES (?, ?)', 
            [body.nombre, body.grupo_id]
        );
        return { id: result.insertId, ...body };
    }
});