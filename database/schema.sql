-- Enterprise Hybrid Sales Management System (POS & Conventional Billing)
-- Database Schema for MySQL
-- Standard Year: 2026

CREATE DATABASE IF NOT EXISTS sales_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sales_system;

-- 1. SECURITY AND CONFIGURATION MODULE

CREATE TABLE roles (
    codigo VARCHAR(20) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    codigo VARCHAR(20) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    clave VARCHAR(255) NOT NULL, -- To be stored as hashed (e.g., Argon2 or BCrypt)
    correo VARCHAR(100) UNIQUE NOT NULL,
    rol_id VARCHAR(20),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(codigo)
);

CREATE TABLE moneda (
    codigo VARCHAR(10) PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL,
    tasa_cambio DECIMAL(18, 4) NOT NULL DEFAULT 1.0000, -- Rate relative to USD
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE empresa_config (
    id INT PRIMARY KEY DEFAULT 1,
    rif_id VARCHAR(20) NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(50),
    moneda_base_id VARCHAR(10),
    multi_moneda BOOLEAN DEFAULT FALSE,
    flag_ventas BOOLEAN DEFAULT TRUE,
    flag_compras BOOLEAN DEFAULT TRUE,
    flag_inventario BOOLEAN DEFAULT TRUE,
    flag_cajas BOOLEAN DEFAULT TRUE,
    correlativo_ventas INT DEFAULT 1,
    correlativo_compras INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT single_row CHECK (id = 1),
    FOREIGN KEY (moneda_base_id) REFERENCES moneda(codigo)
);

-- 2. CORE INVENTORY MODULE

CREATE TABLE categorias (
    codigo VARCHAR(20) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE unidades (
    codigo VARCHAR(20) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE almacenes (
    codigo VARCHAR(20) PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    ubicacion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articulos (
    codigo VARCHAR(50) PRIMARY KEY, -- SKU Interno
    referencia VARCHAR(100), -- Barcode
    descripcion VARCHAR(255) NOT NULL,
    categoria_id VARCHAR(20),
    unidad_id VARCHAR(20),
    almacen_id VARCHAR(20),
    tipo ENUM('Producto', 'Servicio') DEFAULT 'Producto',
    costo_usd DECIMAL(18, 4) DEFAULT 0.0000,
    costo_bs DECIMAL(18, 4) DEFAULT 0.0000,
    precio_venta_usd_1 DECIMAL(18, 4) DEFAULT 0.0000,
    precio_venta_usd_2 DECIMAL(18, 4) DEFAULT 0.0000,
    precio_venta_usd_3 DECIMAL(18, 4) DEFAULT 0.0000,
    precio_venta_bs_1 DECIMAL(18, 4) DEFAULT 0.0000,
    precio_venta_bs_2 DECIMAL(18, 4) DEFAULT 0.0000,
    precio_venta_bs_3 DECIMAL(18, 4) DEFAULT 0.0000,
    imagen_url VARCHAR(255),
    stock_actual DECIMAL(18, 4) DEFAULT 0.0000,
    stock_minimo DECIMAL(18, 4) DEFAULT 0.0000,
    stock_maximo DECIMAL(18, 4) DEFAULT 0.0000,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_referencia (referencia),
    FOREIGN KEY (categoria_id) REFERENCES categorias(codigo),
    FOREIGN KEY (unidad_id) REFERENCES unidades(codigo),
    FOREIGN KEY (almacen_id) REFERENCES almacenes(codigo)
);

CREATE TABLE articulos_compuestos (
    articulo_padre_id VARCHAR(50),
    articulo_hijo_id VARCHAR(50),
    cantidad DECIMAL(18, 4) NOT NULL,
    PRIMARY KEY (articulo_padre_id, articulo_hijo_id),
    FOREIGN KEY (articulo_padre_id) REFERENCES articulos(codigo),
    FOREIGN KEY (articulo_hijo_id) REFERENCES articulos(codigo)
);

-- TRIGGERS FOR BS CALCULATIONS

DELIMITER //

CREATE TRIGGER tr_articulos_before_insert
BEFORE INSERT ON articulos
FOR EACH ROW
BEGIN
    DECLARE v_tasa DECIMAL(18, 4);
    SELECT tasa_cambio INTO v_tasa FROM moneda WHERE codigo = 'VES' LIMIT 1; -- Assuming VES is the Bs currency
    IF v_tasa IS NULL THEN SET v_tasa = 1.0; END IF;

    SET NEW.costo_bs = NEW.costo_usd * v_tasa;
    SET NEW.precio_venta_bs_1 = NEW.precio_venta_usd_1 * v_tasa;
    SET NEW.precio_venta_bs_2 = NEW.precio_venta_usd_2 * v_tasa;
    SET NEW.precio_venta_bs_3 = NEW.precio_venta_usd_3 * v_tasa;
END//

CREATE TRIGGER tr_articulos_before_update
BEFORE UPDATE ON articulos
FOR EACH ROW
BEGIN
    DECLARE v_tasa DECIMAL(18, 4);
    SELECT tasa_cambio INTO v_tasa FROM moneda WHERE codigo = 'VES' LIMIT 1;
    IF v_tasa IS NULL THEN SET v_tasa = 1.0; END IF;

    -- Update BS prices if USD prices or exchange rate logic requires it
    SET NEW.costo_bs = NEW.costo_usd * v_tasa;
    SET NEW.precio_venta_bs_1 = NEW.precio_venta_usd_1 * v_tasa;
    SET NEW.precio_venta_bs_2 = NEW.precio_venta_usd_2 * v_tasa;
    SET NEW.precio_venta_bs_3 = NEW.precio_venta_usd_3 * v_tasa;
END//

-- Trigger to update all articles when the exchange rate changes
CREATE TRIGGER tr_moneda_after_update
AFTER UPDATE ON moneda
FOR EACH ROW
BEGIN
    IF OLD.tasa_cambio <> NEW.tasa_cambio AND NEW.codigo = 'VES' THEN
        UPDATE articulos SET updated_at = NOW(); -- This triggers tr_articulos_before_update for each article
    END IF;
END//

DELIMITER ;

-- VIEW FOR COMPREHENSIVE ARTICLE INFO (Calculated on the fly alternative)
CREATE VIEW vw_articulos_detalle AS
SELECT
    a.*,
    c.descripcion as categoria_nombre,
    u.descripcion as unidad_nombre,
    al.descripcion as almacen_nombre
FROM articulos a
LEFT JOIN categorias c ON a.categoria_id = c.codigo
LEFT JOIN unidades u ON a.unidad_id = u.codigo
LEFT JOIN almacenes al ON a.almacen_id = al.codigo;
