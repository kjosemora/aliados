# Sistema Híbrido de Gestión de Ventas (POS & Facturación) - Enterprise 2026

Este proyecto es un sistema de gestión empresarial diseñado para ser escalable, ultra seguro y con una interfaz de usuario de vanguardia basada en estándares de 2026.

## FASE 1: Arquitectura Base, Seguridad e Inventario Core

### 🏗️ Arquitectura de Software
- **Frontend:** Web Moderno (React/Next.js/Vue - 2026 UI Standards).
- **Backend:** Node.js (Express) con arquitectura modular.
- **Base de Datos:** MySQL 8.0+ optimizado con triggers para cálculos dinámicos.

### 📁 Estructura del Proyecto
```text
/
├── database/
│   └── schema.sql        # Script de creación y lógica de BD
├── docs/
│   └── UI_UX_PROPOSAL.md # Guía de estilos y diseño 2026
├── src/
│   ├── controllers/      # Lógica de negocio (Pendiente implementación)
│   ├── models/           # Definición de datos
│   └── routes/           # Definición de Endpoints API
│       ├── configuracion.js
│       ├── inventario.js
│       ├── ventas.js
│       ├── compras.js
│       ├── cajas.js
│       └── reportes.js
└── README.md
```

### 🚀 Mapa de Rutas API (v1)

| Módulo | Endpoint Base | Estado |
| :--- | :--- | :--- |
| **Configuración** | `/api/v1/configuracion` | Estructural - Completo |
| **Inventario** | `/api/v1/inventario` | Estructural - Completo |
| **Ventas** | `/api/v1/ventas` | Placeholder |
| **Compras** | `/api/v1/compras` | Placeholder |
| **Cajas** | `/api/v1/cajas` | Placeholder |
| **Reportes** | `/api/v1/reportes` | Placeholder |

### 🛠️ Configuración Inicial
1.  **Base de Datos:**
    - Importar `database/schema.sql` en su servidor MySQL.
    - El sistema utiliza triggers para calcular automáticamente los precios en moneda local basados en la tasa de cambio de la tabla `moneda`.

2.  **Servidor API:**
    - Asegurarse de tener Node.js 20+ instalado.
    - Las rutas están definidas bajo el estándar ESM (`type: module`).

## 🎨 Diseño UI/UX
Consulte `docs/UI_UX_PROPOSAL.md` para detalles sobre la implementación de la interfaz "Bento Grid" y el manejo de estados dinámicos en la ficha de artículos.
