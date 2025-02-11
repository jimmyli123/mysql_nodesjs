import mysql from 'mysql2'

const pool = mysql.createPool({
    host:'127.0.0.1',
    user: 'root',
    password: '1314',
    database: 'notes_app'
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows;
}
export async function getNote(id) {
    const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`,[id]);
    return rows[0];
}

export async function createNote(title, content) {
    const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`,[title, content]);
    const id = result.insertId;
    return getNote(id);
}


