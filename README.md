# To-Do-List-Application

## Descripción
Este proyecto es una aplicación de gestión de tareas (To-Do List) construida con **React**, **Vite**, **Material-UI (MUI)** y **Nix**. Permite a los usuarios crear, actualizar y eliminar tareas de manera eficiente; pudiendo visualizar las tareas en páginas en donde el usuario el máximo de tareas que se despliega por página.

## Características
- **Crear tareas** con título.
- **Marcar tareas como completadas**.
- **Eliminar tareas**.
- **Paginación y ordenamiento** de tareas.
- **Notificaciones mediante alertas** para creación, actualización y eliminación de tareas.

## Tecnologías utilizadas
- **React** - Biblioteca para construir interfaces de usuario.
- **Vite** - Entorno de desarrollo rápido para aplicaciones React.
- **Material-UI (MUI)** - Framework de componentes para mejorar el diseño y la usabilidad.
- **Nix** - Sistema de gestión de paquetes y entorno de desarrollo reproducible.

## Estructura del Proyecto
```
/src
  ├── components/
  │   ├── TopRow.tsx        # Componente superior con filtros y ordenamiento
  │   ├── PageManager.tsx   # Manejo de paginación y metadata
  ├── controller/
  │   ├── controller.tsx    # Llamada a los endpoints
  ├── hooks/
  │   ├── AuthContext.tsx   # Manejo de la autenticación del usuario
  │   ├── TokenDecode.tsx   # Decodificación del token del usuario
  ├── views/
  │   ├── login.tsx         # Página de inicio de sesión
  │   ├── login.css         # Estilos de la pantalla de login
  ├── App.tsx               # Componente principal de la aplicación
  ├── App.css               # Estilos generales de la aplicación
  ├── main.tsx              # Punto de entrada de React
  ├── types.tsx             # Definición de tipos
```

## Instalación y Configuración
1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```
2. **Instalar dependencias**
   ```sh
   npm install
   ```
3. **Ejcución de Nix (opcional)**
   ```sh
   nix develop
   ```
   *Nix proporciona un entorno de desarrollo reproducible y fácil de configurar, asegurando que todas las dependencias necesarias estén disponibles.*
3. **Ejecutar el proyecto**
   ```sh
   npm start
   ```

## Uso de la Aplicación
### 1. Agregar una nueva tarea
- Hacer clic en el botón ➕ (Fab) en la esquina inferior derecha.
- Escribir el título de la tarea en el modal.
- Presionar el botón "Create".

### 2. Completar una tarea
- Presionar el botón ✅ en la tarea deseada.
- Se mostrará una notificación confirmando la acción.

### 3. Eliminar una tarea
- Presionar el botón ❌ en la tarea.
- Confirmar la eliminación en el modal emergente.

### 4. Filtrar y ordenar tareas
- Seleccionar el número máximo de tareas a mostrar.
- Cambiar el orden de las tareas (ascendente/descendente) con el botón 🔼/🔽.

## Notificaciones
- **Task created!** → Cuando se crea una nueva tarea.
- **Task completed!** → Cuando se marca una tarea como completada.
- **Task eliminated!** → Cuando se elimina una tarea.

---

