import pool from '../config/db.js';

class RolModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM roles');
    return rows;
  }

  static async create(codigo, descripcion) {
    const [result] = await pool.query('INSERT INTO roles (codigo, descripcion) VALUES (?, ?)', [codigo, descripcion]);
    return result;
  }
}

export default RolModel;
