# Propuesta de Diseño UI/UX - Sistema de Gestión 2026

## 1. Filosofía Visual: "Precision & Fluidity"
Para el año 2026, nos alejamos de las interfaces saturadas. Adoptamos una estética basada en **Bento Grids** para la organización de datos y un **Glassmorphism Refinado** para la profundidad.

### Paleta de Colores (Modo Oscuro Predeterminado)
- **Fondo Base:** `#0A0C10` (Deep Space)
- **Tarjetas/Contenedores:** `rgba(255, 255, 255, 0.03)` con backdrop-filter blur de 20px.
- **Primario:** `#6366F1` (Indigo Neon) - Para acciones principales.
- **Énfasis:** `#10B981` (Emerald) - Para estados positivos/stock.
- **Alerta:** `#F43F5E` (Rose) - Para stock bajo o errores.
- **Texto:** `#F8FAFC` (High Contrast White) / `#94A3B8` (Muted Slate).

### Tipografía
- **Inter** o **Plus Jakarta Sans**: Con pesos variables para establecer una jerarquía clara sin necesidad de líneas divisorias excesivas.

---

## 2. Pantalla Principal: Ficha del Artículo

### Distribución (Bento Grid Layout)
La pantalla se organiza en bloques lógicos de tamaño variable:

1.  **Bloque de Identificación (Superior Izquierda):** SKU, Código de Barras y Descripción Principal. Tipografía grande y negrita.
2.  **Bloque de Medios (Derecha):** Dropzone para imagen con previsualización 3D (si aplica) o alta resolución.
3.  **Bloque de Precios (Central):** Grid interno con comparativa USD vs Local (Bs). Los campos se actualizan en tiempo real al cambiar la tasa.
4.  **Bloque de Inventario (Inferior Izquierda):** Stocks (Actual, Mínimo, Máximo) con visualización de progreso circular.
5.  **Bloque de Relaciones (Inferior Derecha):** Artículos compuestos/Kits.

### Interacciones Clave

#### A. Creación "Al Vuelo"
- Los campos de **Categoría**, **Unidad** y **Almacén** son selectores inteligentes.
- Junto a cada selector, un botón `+` discreto abre un **Drawer lateral** (no un modal central obstructivo) para crear la nueva entidad.
- Al guardar en el Drawer, el selector principal se actualiza automáticamente y mantiene el foco del usuario.

#### B. Switch Dinámico: Producto vs Servicio
- Al activar "Servicio":
    - El bloque de **Inventario** se desvanece con una transición suave.
    - El selector de **Almacén** se oculta.
    - El campo de **Stock Mínimo/Máximo** se desactiva.
    - Se mantiene el bloque de Precios y Categoría.

#### C. Toggle Multi-moneda
- Un interruptor global o por campo que expande/colapsa las entradas de moneda secundaria.
- Visualmente, se usa un color de acento diferente (ej. Dorado para USD, Azul para Local) para diferenciar los inputs rápidamente.

---

## 3. Elementos de UI Modernos
- **Micro-interacciones:** Feedback táctil visual al guardar.
- **Skeleton Screens:** Para la carga de datos del inventario.
- **Comandos Rápidos:** Soporte nativo para `Ctrl+K` para búsquedas globales de artículos.
- **Contraste:** Cumplimiento estricto de WCAG 2.1 para garantizar legibilidad en entornos POS de alta luminosidad.
