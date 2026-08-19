# Especificación de Demo — Plataforma de Gestión de Mantenimiento Minero

## 1. Objetivo

Construir una **demo frontend interactiva** de una plataforma web para la gestión del mantenimiento de una pequeña empresa minera en Perú.

La plataforma será utilizada principalmente por el **Jefe de Mantenimiento**, supervisores y técnicos para controlar:

- Activos y equipos propios y de terceros.
- Mantenimiento preventivo y correctivo.
- Solicitudes y órdenes de trabajo.
- Planificación de mantenimiento.
- Horómetros y próximos servicios.
- Repuestos y consumos.
- Personal técnico.
- Costos.
- Historial de mantenimiento.
- Indicadores de mantenimiento.
- Evidencias fotográficas/documentales.
- Alertas.
- Una **simulación de integración con SAP ERP/SAP S/4HANA**, sin realizar ninguna conexión real.

> Esta versión es exclusivamente una demo frontend. No existe backend, base de datos real ni autenticación real.

---

# 2. Objetivo de la demo

La demo debe permitir que el cliente entienda visualmente cómo podría funcionar la solución real.

Debe sentirse como un **producto SaaS empresarial**, no como una colección de pantallas estáticas.

La interfaz debe permitir navegar, filtrar, abrir registros, modificar estados, crear solicitudes/OT de prueba, consultar equipos, revisar indicadores y visualizar una simulación de integración con SAP.

El flujo principal que debe poder demostrarse es:

```text
Operador reporta falla
        ↓
Solicitud de mantenimiento
        ↓
Supervisor/Jefe evalúa
        ↓
Orden de trabajo
        ↓
Asignación de técnico
        ↓
Ejecución del mantenimiento
        ↓
Registro de horas + repuestos + checklist + evidencias
        ↓
Cierre de OT
        ↓
Actualización del historial del equipo
        ↓
Actualización de costos
        ↓
Simulación de sincronización con SAP
        ↓
Dashboard gerencial
```

---

# 3. Stack frontend

Preferencia:

- HTML5
- CSS3
- JavaScript ES6+

Opcional:

- React + Vite si el agente considera que mejora la implementación.
- Chart.js para gráficos.
- Lucide Icons o Font Awesome para iconografía.

La demo debe poder ejecutarse localmente sin backend.

Si se utiliza React:

```text
React
Vite
JavaScript
CSS
Chart.js
Lucide React
```

Si se utiliza HTML puro:

```text
index.html
styles.css
app.js
```

No crear APIs reales.

No crear servidor backend.

No crear base de datos.

Utilizar datos mock en JavaScript/JSON.

---

# 4. Principios de UX/UI

La aplicación debe tener aspecto de software empresarial moderno.

Características:

- Diseño responsive.
- Desktop-first.
- Compatible con tablet.
- Preparado visualmente para uso móvil por técnicos.
- Sidebar lateral.
- Header superior.
- Breadcrumbs.
- Cards de indicadores.
- Tablas profesionales.
- Filtros.
- Modales.
- Formularios.
- Badges de estado.
- Toasts/notificaciones.
- Gráficos.
- Drawer lateral cuando sea conveniente.
- Confirmaciones para acciones importantes.

Evitar:

- Gradientes excesivos.
- Diseños tipo landing page.
- Animaciones innecesarias.
- Exceso de colores.
- Elementos decorativos sin función.

La interfaz debe transmitir:

**Operación minera + mantenimiento + software empresarial.**

---

# 5. Identidad visual

Usar una estética industrial/empresarial.

Paleta sugerida:

- Fondo general: gris muy claro.
- Sidebar: gris oscuro / azul oscuro.
- Color primario: azul oscuro.
- Acción principal: azul.
- Éxito: verde.
- Advertencia: amarillo/ámbar.
- Crítico: rojo.
- Información: azul/cian.

Los colores deben utilizarse principalmente para comunicar estados.

Ejemplos:

```text
OPERATIVO       → verde
EN MANTENIMIENTO → amarillo
DETENIDO         → rojo
PROGRAMADO       → azul
ATRASADO         → rojo
COMPLETADO       → verde
PENDIENTE        → gris/azul
```

---

# 6. Estructura principal

Sidebar:

```text
Dashboard
Mantenimiento
    Solicitudes
    Órdenes de trabajo
    Plan preventivo
    Calendario
Activos
    Equipos
    Componentes
    Ubicaciones
Inventario
    Repuestos
    Movimientos
Personal
    Técnicos
    Cuadrillas
Reportes
Indicadores
Integraciones
    SAP ERP
Configuración
```

Header:

```text
[Buscar...]

[Notificaciones]

[Jefe de Mantenimiento]
```

---

# 7. Dashboard principal

Ruta conceptual:

```text
/dashboard
```

Debe ser la primera pantalla.

Título:

**Dashboard de Mantenimiento**

Subtítulo:

**Unidad Minera Santa Rosa — Estado operativo**

## Filtros

- Periodo.
- Unidad minera.
- Área.
- Tipo de equipo.
- Propio / Tercero.

## KPIs

Mostrar:

### Equipos

```text
Total: 48
Operativos: 39
En mantenimiento: 6
Detenidos: 3
```

### Órdenes de trabajo

```text
Pendientes: 12
En ejecución: 8
Atrasadas: 3
Completadas: 42
```

### Disponibilidad

```text
92.4%
```

### Cumplimiento preventivo

```text
87.8%
```

### MTBF

```text
186 h
```

### MTTR

```text
6.4 h
```

### Costo de mantenimiento del mes

```text
S/ 86,450
```

## Gráficos

Crear:

1. Preventivo vs Correctivo.
2. Costos de mantenimiento por mes.
3. Horas de parada por equipo.
4. OT por estado.
5. Fallas por categoría.
6. Costos por tipo de equipo.

## Panel de alertas

Ejemplos:

```text
3 mantenimientos preventivos vencidos
5 equipos con próxima intervención
2 repuestos bajo stock mínimo
1 equipo detenido hace más de 24 horas
```

---

# 8. Módulo de activos

Ruta:

```text
/activos
```

Mostrar tabla de equipos.

Columnas:

- Código.
- Equipo.
- Tipo.
- Marca.
- Modelo.
- Propietario.
- Ubicación.
- Horómetro.
- Estado.
- Próximo mantenimiento.
- Acciones.

Ejemplo:

| Código | Equipo | Tipo | Propietario | Horómetro | Estado |
|---|---|---|---|---:|---|
| EQ-001 | Excavadora CAT 320 | Excavadora | Propio | 8,542 h | Operativo |
| EQ-002 | Excavadora Komatsu PC210 | Excavadora | Tercero | 5,821 h | Mantenimiento |
| EQ-003 | Volvo FMX 440 | Volquete | Propio | 12,420 h | Operativo |
| EQ-004 | Scania P410 | Volquete | Tercero | 9,845 h | Detenido |
| EQ-005 | Caterpillar 950M | Cargador | Propio | 7,210 h | Operativo |

Filtros:

- Código.
- Nombre.
- Tipo.
- Marca.
- Propietario.
- Estado.
- Ubicación.

Acciones:

```text
Ver
Editar
Historial
Crear OT
```

---

# 9. Propiedad de los equipos

Debe diferenciar claramente:

```text
PROPIO
TERCERO
```

Esto es importante porque la minera utiliza equipos propios y equipos de terceros.

En la ficha del equipo mostrar:

```text
Propiedad
[ PROPIO ]
```

o

```text
Propiedad
[ TERCERO ]
```

Para terceros incluir:

- Empresa propietaria.
- Contratista.
- Contacto.
- Contrato.
- Fecha de inicio.
- Fecha de vencimiento.

Ejemplo:

```text
Empresa:
Servicios Mineros ABC SAC

Contrato:
CTR-2026-014

Vigencia:
01/01/2026 — 31/12/2026
```

---

# 10. Ficha detallada del equipo

Ruta conceptual:

```text
/activos/EQ-001
```

Debe tener:

## Encabezado

```text
Excavadora CAT 320
EQ-001

[OPERATIVO]

Propio
```

Mostrar:

- Fotografía.
- Marca.
- Modelo.
- Serie.
- Año.
- Ubicación.
- Horómetro.
- Responsable.

## Tabs

```text
Resumen
Historial
Mantenimiento
Órdenes de trabajo
Componentes
Costos
Documentos
```

## Resumen

Mostrar:

- Último mantenimiento.
- Próximo mantenimiento.
- Horas restantes.
- Disponibilidad.
- Total de fallas.
- Costo acumulado.

## Historial

Tabla:

```text
Fecha
OT
Tipo
Descripción
Técnico
Horas
Costo
Estado
```

---

# 11. Horómetro

La demo debe mostrar que el mantenimiento puede depender de horas de operación.

Ejemplo:

```text
Horómetro actual
8,542 h

Próximo mantenimiento
8,750 h

Faltan
208 h
```

Crear una barra de progreso visual.

Permitir simular:

```text
Actualizar horómetro
```

Al cambiar el valor, recalcular visualmente el próximo mantenimiento.

Ejemplo:

```text
Actual: 8,700 h

Próximo servicio: 8,750 h

Faltan: 50 h

[ Mantenimiento próximo ]
```

---

# 12. Mantenimiento preventivo

Ruta:

```text
/mantenimiento/preventivo
```

Mostrar planes:

| Código | Equipo | Servicio | Frecuencia | Próximo | Estado |
|---|---|---|---|---|---|
| MP-001 | CAT 320 | Servicio 250 h | 250 h | 8,750 h | Próximo |
| MP-002 | Volvo FMX | Servicio 500 h | 500 h | 12,500 h | Programado |
| MP-003 | PC210 | Servicio 1,000 h | 1,000 h | 6,000 h | Atrasado |

Tipos de frecuencia:

- Diario.
- Semanal.
- Mensual.
- Por horas.
- Por kilometraje.
- Por ciclos.

---

# 13. Checklist preventivo

Al abrir un mantenimiento:

```text
Mantenimiento preventivo — Servicio 250 horas

Equipo: Excavadora CAT 320
OT: OT-2026-0154
```

Checklist:

### Motor

- [ ] Nivel de aceite.
- [ ] Filtro de aceite.
- [ ] Refrigerante.
- [ ] Fugas.
- [ ] Correas.

### Sistema hidráulico

- [ ] Nivel hidráulico.
- [ ] Mangueras.
- [ ] Fugas.
- [ ] Presión.

### Sistema eléctrico

- [ ] Batería.
- [ ] Conexiones.
- [ ] Luces.

Cada elemento puede tener:

```text
OK
OBSERVACIÓN
NO CONFORME
NO APLICA
```

---

# 14. Solicitudes de mantenimiento

Ruta:

```text
/mantenimiento/solicitudes
```

Tabla:

```text
ID
Fecha
Equipo
Reportado por
Problema
Prioridad
Estado
Responsable
```

Estados:

```text
Nueva
En evaluación
Aprobada
Rechazada
Convertida en OT
```

Crear botón:

```text
+ Nueva solicitud
```

Formulario:

- Equipo.
- Reportante.
- Tipo de falla.
- Descripción.
- Prioridad.
- Fotografía.
- Fecha.

---

# 15. Simular flujo de solicitud

Crear una interacción funcional:

```text
Nueva solicitud
        ↓
Guardar
        ↓
Solicitud aparece como "Nueva"
        ↓
Abrir
        ↓
[Convertir a OT]
        ↓
Se crea una OT mock
```

No utilizar backend.

Guardar temporalmente en memoria o localStorage.

---

# 16. Órdenes de trabajo

Ruta:

```text
/mantenimiento/ordenes
```

Tabla:

```text
OT
Equipo
Tipo
Prioridad
Responsable
Fecha programada
Estado
Costo
```

Estados:

```text
Pendiente
Programada
En ejecución
En espera
Completada
Cancelada
```

Tipos:

```text
Preventivo
Correctivo
Predictivo
Inspección
Emergencia
```

---

# 17. Detalle de orden de trabajo

Ejemplo:

```text
OT-2026-0154

Cambio de manguera hidráulica

Equipo:
Excavadora CAT 320

Prioridad:
Alta

Estado:
En ejecución
```

Tabs:

```text
Resumen
Actividades
Checklist
Repuestos
Mano de obra
Evidencias
Historial
```

## Resumen

Mostrar:

- Fecha de creación.
- Fecha programada.
- Inicio.
- Fin.
- Responsable.
- Técnicos.
- Tiempo de parada.
- Costo.

## Actividades

Ejemplo:

```text
Diagnóstico
Cambio de manguera
Prueba hidráulica
Inspección final
```

Permitir marcar actividades completadas.

---

# 18. Registro de mano de obra

Mostrar:

```text
Técnico             Horas
Juan Pérez           4.0
Carlos López         3.5
Pedro Gómez          2.0
```

Calcular:

```text
Horas hombre: 9.5 h
Costo mano de obra: S/ 427.50
```

---

# 19. Repuestos dentro de una OT

Ejemplo:

```text
Repuestos utilizados

Filtro hidráulico
Cantidad: 1
Costo unitario: S/ 320

Manguera hidráulica
Cantidad: 1
Costo unitario: S/ 850
```

Total:

```text
S/ 1,170
```

Al registrar consumo, actualizar mock de inventario.

---

# 20. Evidencias

Crear sección:

```text
Evidencias
```

Permitir simular:

```text
+ Agregar fotografía
+ Agregar documento
```

Mostrar tarjetas:

```text
Antes
Durante
Después
Informe técnico
```

No es necesario subir realmente archivos a un servidor.

Puede utilizar imágenes locales/mock.

---

# 21. Correctivo

Crear flujo específico:

```text
Falla detectada
↓
Diagnóstico
↓
Planificación
↓
Reparación
↓
Prueba
↓
Liberación del equipo
```

Ejemplo:

```text
Falla:
Pérdida de presión hidráulica

Diagnóstico:
Manguera hidráulica dañada

Causa:
Desgaste

Acción:
Reemplazo de manguera

Resultado:
Equipo operativo
```

---

# 22. Inventario de repuestos

Ruta:

```text
/inventario/repuestos
```

Tabla:

```text
Código
Repuesto
Categoría
Stock
Stock mínimo
Unidad
Ubicación
Estado
```

Ejemplo:

```text
REP-001
Filtro de aceite CAT
Filtros
8
5
UND
Almacén A
Disponible
```

Crear alertas para:

```text
Stock normal
Stock bajo
Sin stock
```

---

# 23. Personal técnico

Ruta:

```text
/personal
```

Mostrar:

- Nombre.
- Cargo.
- Especialidad.
- Estado.
- OT asignadas.
- Horas trabajadas.

Ejemplos:

```text
Juan Pérez
Mecánico
Especialidad: Equipos pesados

Carlos López
Técnico eléctrico
Especialidad: Sistemas eléctricos

Pedro Gómez
Mecánico
Especialidad: Hidráulica
```

---

# 24. Calendario de mantenimiento

Ruta:

```text
/mantenimiento/calendario
```

Mostrar calendario mensual.

Cada OT debe aparecer visualmente según:

- Preventivo.
- Correctivo.
- Inspección.
- Emergencia.

Permitir hacer clic en una OT para abrir su detalle.

---

# 25. Reportes

Ruta:

```text
/reportes
```

Reportes mock:

- Historial de mantenimiento.
- Costos por equipo.
- Costos por tipo de mantenimiento.
- OT completadas.
- OT atrasadas.
- Disponibilidad.
- MTBF.
- MTTR.
- Consumo de repuestos.
- Horas hombre.
- Horas de parada.

Botones:

```text
Exportar Excel
Exportar PDF
```

Para la demo pueden mostrar un toast:

```text
Reporte generado correctamente.
```

No es necesario generar realmente archivos.

---

# 26. Indicadores

Ruta:

```text
/indicadores
```

Mostrar:

## Disponibilidad

```text
92.4%
```

## MTBF

```text
186 h
```

## MTTR

```text
6.4 h
```

## Cumplimiento preventivo

```text
87.8%
```

## Backlog

```text
14 OT
```

## Correctivo vs preventivo

```text
Preventivo: 68%
Correctivo: 32%
```

Agregar explicación visual de cada indicador mediante tooltip o modal informativo.

---

# 27. Gestión de terceros

Como existen equipos propios y de terceros, crear un concepto de:

```text
Propietario del equipo
```

Tipos:

```text
Propio
Contratista
Proveedor
Tercero
```

Mostrar:

- Empresa.
- Contrato.
- Equipo.
- Estado.
- Mantenimiento realizado.
- Costos asociados.

Esto debe ser visible en el detalle del equipo.

---

# 28. Integración simulada con SAP

Crear un módulo específico:

```text
Integraciones
    SAP ERP
```

Ruta:

```text
/integraciones/sap
```

IMPORTANTE:

No realizar conexión real.

Debe ser una **simulación visual de integración**.

Objetivo de la demo:

Mostrar al cliente que la plataforma puede actuar como sistema especializado de mantenimiento y posteriormente integrarse con SAP.

---

# 29. Pantalla de integración SAP

Título:

**Integración con SAP ERP**

Mostrar estado:

```text
● Simulación activa
```

No decir "conectado" si no existe una conexión real.

Mostrar arquitectura:

```text
Plataforma de Mantenimiento
          ↓
       API REST
          ↓
      Middleware
          ↓
        SAP ERP
```

Debajo:

### Datos que podrían sincronizarse

```text
Equipos / Activos
Centros de costo
Materiales
Repuestos
Proveedores
Órdenes de compra
Costos
Órdenes de mantenimiento
```

---

# 30. Simulador de sincronización SAP

Crear botón:

```text
[ Simular sincronización ]
```

Al presionarlo, mostrar una animación/progreso:

```text
Conectando con SAP...
Validando información...
Sincronizando activos...
Sincronizando materiales...
Sincronizando costos...
Proceso completado.
```

Después mostrar:

```text
Resultado

Activos sincronizados: 48
Materiales sincronizados: 126
Centros de costo: 8
Errores: 0

Última sincronización:
19/08/2026 10:42
```

Todo debe ser mock.

---

# 31. Log de integración

Mostrar tabla:

| Fecha | Proceso | Registros | Estado |
|---|---|---:|---|
| 19/08/26 10:42 | Activos | 48 | Exitoso |
| 19/08/26 10:41 | Materiales | 126 | Exitoso |
| 19/08/26 10:40 | Centros de costo | 8 | Exitoso |
| 18/08/26 18:20 | Costos | 85 | Exitoso |

Estados:

```text
Exitoso
Advertencia
Error
```

---

# 32. Simulación de datos SAP

Crear una sección:

```text
Datos provenientes de SAP
```

Ejemplos:

```text
Centro de costo:
CC-MIN-001

Material:
MAT-000145

Proveedor:
PROV-00128

Orden:
4500012458
```

Mostrar una etiqueta:

```text
SAP ID
```

Esto ayuda a explicar la futura trazabilidad entre sistemas.

---

# 33. Concepto de integración

La demo debe transmitir:

```text
SAP
│
├── Maestros
│   ├── Materiales
│   ├── Proveedores
│   ├── Centros de costo
│   └── Activos
│
└──────────────┐
               ↓
       Plataforma de
       Mantenimiento
               ↓
       Gestión operativa
       del mantenimiento
               ↓
       Información de vuelta
       hacia SAP
```

No asumir una integración técnica concreta.

En una implementación real habría que validar:

- Versión de SAP.
- Módulos utilizados.
- APIs disponibles.
- SAP S/4HANA vs SAP ECC.
- OData.
- APIs REST.
- SAP BTP.
- Middleware.
- Reglas de negocio.
- Maestros.
- Frecuencia de sincronización.
- Sistema fuente de cada dato.

---

# 34. Centro de notificaciones

Agregar campana en el header.

Ejemplos:

```text
3 mantenimientos próximos
2 OT atrasadas
1 repuesto bajo mínimo
1 equipo detenido
```

Al hacer clic, abrir dropdown.

---

# 35. Buscador global

El header debe tener:

```text
Buscar equipo, OT, solicitud, repuesto...
```

Resultados mock:

```text
EQ-001 — Excavadora CAT 320
OT-2026-0154 — Cambio manguera hidráulica
REP-001 — Filtro de aceite CAT
SOL-2026-0082 — Fuga hidráulica
```

---

# 36. Datos mock

Crear suficiente información para que las pantallas parezcan reales.

Mínimo:

```text
48 equipos
15 excavadoras
18 volquetes
5 cargadores
4 perforadoras
3 motoniveladoras
3 otros
```

Distribuir:

```text
Propios
Terceros
```

Crear:

```text
80 órdenes de trabajo
40 solicitudes
120 repuestos
20 técnicos
12 planes preventivos
```

Los datos deben ser coherentes entre sí.

Por ejemplo:

Si un equipo tiene una OT:

```text
EQ-001
```

esa OT debe aparecer también en su historial.

---

# 37. Interacciones obligatorias

La demo no debe ser estática.

Implementar como mínimo:

### Dashboard

- Cambiar filtros.
- Actualizar KPIs.

### Equipos

- Buscar.
- Filtrar.
- Abrir ficha.
- Ver historial.

### Solicitudes

- Crear solicitud.
- Cambiar estado.
- Convertir solicitud en OT.

### OT

- Abrir.
- Cambiar estado.
- Asignar técnico.
- Agregar repuesto.
- Completar checklist.
- Registrar horas.
- Cerrar OT.

### Inventario

- Buscar.
- Filtrar.
- Simular consumo de repuesto.

### Calendario

- Cambiar mes.
- Abrir OT.

### SAP

- Simular sincronización.
- Mostrar progreso.
- Actualizar log.

### Notificaciones

- Abrir.
- Marcar como leídas.

Utilizar `localStorage` cuando sea conveniente para conservar cambios mientras se navega.

---

# 38. Flujo principal para la presentación al cliente

La demo debe estar preparada para mostrar este escenario:

## Paso 1

Entrar al Dashboard.

Mostrar:

```text
48 equipos
3 detenidos
6 en mantenimiento
12 OT pendientes
87.8% cumplimiento preventivo
```

## Paso 2

Entrar a:

```text
Activos
```

Seleccionar:

```text
EQ-001 — Excavadora CAT 320
```

## Paso 3

Mostrar:

```text
Horómetro:
8,542 h

Próximo mantenimiento:
8,750 h
```

## Paso 4

Mostrar historial.

Identificar una falla reciente.

## Paso 5

Entrar a Solicitudes.

Abrir:

```text
SOL-2026-0082
Pérdida de presión hidráulica
```

## Paso 6

Convertir a OT.

Generar:

```text
OT-2026-0154
```

## Paso 7

Asignar:

```text
Juan Pérez
Carlos López
```

## Paso 8

Completar checklist.

## Paso 9

Registrar:

```text
4 horas de trabajo
1 manguera
1 filtro
```

## Paso 10

Agregar evidencia.

## Paso 11

Cerrar OT.

## Paso 12

Volver al equipo.

Mostrar cómo el historial se actualizó.

## Paso 13

Mostrar costo.

```text
Costo OT:
S/ 1,597.50
```

## Paso 14

Ir a:

```text
Integraciones → SAP ERP
```

## Paso 15

Presionar:

```text
Simular sincronización
```

Mostrar proceso y resultado.

## Paso 16

Volver al Dashboard.

Mostrar cómo los indicadores se actualizaron.

---

# 39. Arquitectura frontend

Si se utiliza React:

```text
src/
│
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── KPICard.jsx
│   ├── StatusBadge.jsx
│   ├── DataTable.jsx
│   ├── Modal.jsx
│   ├── Drawer.jsx
│   ├── Toast.jsx
│   └── EmptyState.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Assets.jsx
│   ├── AssetDetail.jsx
│   ├── Requests.jsx
│   ├── WorkOrders.jsx
│   ├── WorkOrderDetail.jsx
│   ├── PreventiveMaintenance.jsx
│   ├── Calendar.jsx
│   ├── Inventory.jsx
│   ├── Technicians.jsx
│   ├── Reports.jsx
│   ├── Indicators.jsx
│   └── SAPIntegration.jsx
│
├── data/
│   ├── assets.js
│   ├── workOrders.js
│   ├── requests.js
│   ├── spareParts.js
│   ├── technicians.js
│   └── sap.js
│
├── services/
│   └── mockService.js
│
├── utils/
│   ├── calculations.js
│   └── formatters.js
│
└── App.jsx
```

---

# 40. Reglas de datos

Mantener relaciones coherentes:

```text
Equipo
  ↓
Solicitudes
  ↓
OT
  ↓
Actividades
  ↓
Técnicos
  ↓
Repuestos
  ↓
Costos
  ↓
Historial
```

No generar datos completamente aleatorios en cada render.

Los datos mock deben ser persistentes durante la sesión.

---

# 41. Cálculos mock

Implementar funciones para:

### Costo OT

```text
Costo total =
Mano de obra +
Repuestos +
Servicios externos
```

### Horas hombre

```text
Σ horas de técnicos
```

### MTTR

```text
Σ horas de reparación / número de fallas
```

### MTBF

```text
Horas operativas / número de fallas
```

### Cumplimiento preventivo

```text
Preventivos completados a tiempo /
Preventivos programados × 100
```

### Disponibilidad

```text
Tiempo operativo /
(Tiempo operativo + Tiempo detenido) × 100
```

---

# 42. Responsividad

En desktop:

```text
Sidebar + contenido
```

En tablet:

```text
Sidebar colapsable
```

En móvil:

```text
Header
Contenido
Bottom navigation opcional
```

La pantalla de OT debe estar especialmente preparada para móvil porque el técnico podría utilizarla desde campo.

---

# 43. Modo técnico móvil

Aunque la demo sea principalmente desktop, crear una representación responsive de la OT.

En móvil:

```text
OT-2026-0154

Excavadora CAT 320

[EN EJECUCIÓN]

Prioridad: ALTA

[Iniciar trabajo]

Checklist
████████░░ 80%

Repuestos

Evidencias

Horas trabajadas

[Finalizar OT]
```

Esto puede ser un punto diferenciador durante la presentación.

---

# 44. Seguridad visual

Aunque no exista backend, mostrar conceptualmente:

```text
Usuario:
Jefe de Mantenimiento

Rol:
Administrador de Mantenimiento
```

En el futuro podrían existir permisos por rol.

No implementar autenticación real.

---

# 45. Terminología

Usar español peruano y terminología de mantenimiento.

Preferir:

```text
Orden de Trabajo
Solicitud de Mantenimiento
Equipo
Activo
Horómetro
Repuesto
Técnico
Mantenimiento Preventivo
Mantenimiento Correctivo
Disponibilidad
Horas de Parada
Horas Hombre
Centro de Costo
Contratista
Tercero
```

Evitar traducciones poco naturales.

---

# 46. Alcance que NO debe implementarse

No crear:

- Backend.
- API real.
- Base de datos.
- Login real.
- Integración real con SAP.
- Integración real con WhatsApp.
- Integración real con correo.
- IoT.
- GPS real.
- Machine Learning.
- IA predictiva.

La finalidad es presentar una **prueba visual y funcional del concepto**.

---

# 47. Resultado esperado

Al finalizar, debe existir una aplicación web navegable que permita demostrar:

```text
Dashboard
    ↓
Activos
    ↓
Equipo
    ↓
Historial
    ↓
Solicitud
    ↓
Orden de trabajo
    ↓
Ejecución
    ↓
Checklist
    ↓
Repuestos
    ↓
Costos
    ↓
Cierre
    ↓
Historial actualizado
    ↓
Indicadores
    ↓
Simulación SAP
```

La aplicación debe sentirse como el prototipo de un producto real denominado provisionalmente:

# Mantenimiento Minero

Subtítulo:

**Plataforma integral para la gestión de mantenimiento de equipos mineros.**

La arquitectura debe quedar preparada para que posteriormente el frontend pueda conectarse a un backend real sin tener que rediseñar completamente las pantallas.
