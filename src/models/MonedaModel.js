import pool from '../config/db.js';

class MonedaModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM moneda');
    return rows;
  }

  static async getByCodigo(codigo) {
    const [rows] = await pool.query('SELECT * FROM moneda WHERE codigo = ?', [codigo]);
    return rows[0];
  }

  static async updateTasa(codigo, tasa) {
    const [result] = await pool.query('UPDATE moneda SET tasa_cambio = ? WHERE codigo = ?', [tasa, codigo]);
    return result;
  }
}

export default MonedaModel;
