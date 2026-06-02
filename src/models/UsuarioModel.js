import pool from '../config/db.js';

class UsuarioModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT codigo, descripcion, correo, rol_id, estado FROM usuarios');
    return rows;
  }

  static async getByCodigo(codigo) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE codigo = ?', [codigo]);
    return rows[0];
  }

  static async create(data) {
    const { codigo, descripcion, clave, correo, rol_id, estado } = data;
    const [result] = await pool.query(
      'INSERT INTO usuarios (codigo, descripcion, clave, correo, rol_id, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [codigo, descripcion, clave, correo, rol_id, estado]
    );
    return result;
  }

  static async update(codigo, data) {
    const { descripcion, correo, rol_id, estado } = data;
    const [result] = await pool.query(
      'UPDATE usuarios SET descripcion = ?, correo = ?, rol_id = ?, estado = ? WHERE codigo = ?',
      [descripcion, correo, rol_id, estado, codigo]
    );
    return result;
  }
}

export default UsuarioModel;
