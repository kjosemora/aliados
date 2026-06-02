import pool from '../config/db.js';

class ConfigModel {
  static async getConfig() {
    const [rows] = await pool.query('SELECT * FROM empresa_config WHERE id = 1');
    return rows[0];
  }

  static async updateConfig(data) {
    const { rif_id, nombre, direccion, telefono, moneda_base_id, multi_moneda, flag_ventas, flag_compras, flag_inventario, flag_cajas } = data;
    const [result] = await pool.query(
      `UPDATE empresa_config SET
        rif_id = ?, nombre = ?, direccion = ?, telefono = ?,
        moneda_base_id = ?, multi_moneda = ?, flag_ventas = ?,
        flag_compras = ?, flag_inventario = ?, flag_cajas = ?
      WHERE id = 1`,
      [rif_id, nombre, direccion, telefono, moneda_base_id, multi_moneda, flag_ventas, flag_compras, flag_inventario, flag_cajas]
    );
    return result;
  }
}

export default ConfigModel;
