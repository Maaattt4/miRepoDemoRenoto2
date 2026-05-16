export default defineEventHandler(async (event) => {
    const method = event.method;

    if (method === 'GET') {
        const [rows] = await pool.query('SELECT * FROM grupos');
        return rows;
    }

    if (method === 'POST') {
        const body = await readBody(event);
        const [result] = await pool.query('INSERT INTO grupos (nombre) VALUES (?)', [body.nombre]);
        return { id: result.insertId, nombre: body.nombre };
    }

    if (method === 'DELETE') {
        const body = await readBody(event);
        await pool.query('DELETE FROM grupos WHERE id = ?', [body.id]);
        return { success: true };
    }
});