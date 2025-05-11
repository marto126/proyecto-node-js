# Aplicación CRUD de Películas

Esta es una aplicación full-stack que permite gestionar un catálogo de películas. Utiliza el stack MERN (MongoDB, Express, React y Node.js) para proporcionar una experiencia completa de Crear, Leer, Actualizar y Eliminar (CRUD) información sobre películas.

## Funcionalidades

- Ver todas las películas en un catálogo
- Buscar películas por título, director o género
- Añadir nuevas películas
- Editar películas existentes
- Eliminar películas

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) instalado localmente o una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

## Instalación

### Paso 1: Clonar o descargar el repositorio

```bash
git clone https://github.com/tu-usuario/movie-app.git
cd movie-app
```

O simplemente descarga y extrae el código en una carpeta llamada `movie-app`.

### Paso 2: Configurar el backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
```

Crea un archivo llamado `.env` en la carpeta `backend` con el siguiente contenido:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviesdb
```

Si estás usando MongoDB Atlas, reemplaza la URI con tu cadena de conexión:

```
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/moviesdb?retryWrites=true&w=majority
```

### Paso 3: Configurar el frontend

```bash
# Navegar a la carpeta raíz
cd ..

# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
```

Crea un archivo llamado `.env` en la carpeta `frontend` con el siguiente contenido:

```
VITE_API_URL=http://localhost:5000/api
```

## Ejecución de la aplicación

### Paso 1: Iniciar MongoDB (solo instalación local)

#### En Windows:
1. Presiona `Win + R`, escribe `services.msc` y presiona Enter
2. Busca "MongoDB" en la lista de servicios
3. Asegúrate de que esté "En ejecución" (si no lo está, haz clic derecho y selecciona "Iniciar")

#### En macOS:
```bash
brew services start mongodb-community
```

#### En Linux:
```bash
sudo systemctl start mongod
```

> **Nota**: Si estás usando MongoDB Atlas, puedes omitir este paso.

### Paso 2: Iniciar el servidor backend

```bash
# Navegar a la carpeta backend
cd backend

# Iniciar el servidor (en modo desarrollo)
npm run dev

# Alternativa: Iniciar en modo producción
# npm start
```

Deberías ver mensajes indicando que el servidor está funcionando en http://localhost:5000 y que la conexión a MongoDB se ha establecido con éxito.

### Paso 3: Iniciar la aplicación frontend

Abre una nueva terminal:

```bash
# Navegar a la carpeta frontend
cd frontend

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación frontend debería estar disponible en: http://localhost:5173

## Uso de la aplicación

1. **Ver películas**: La página principal muestra todas las películas en el catálogo
2. **Añadir película**: Haz clic en "Añadir Película" en la barra de navegación para crear una nueva película
3. **Editar película**: Haz clic en el icono de edición (lápiz) en una tarjeta de película para modificarla
4. **Eliminar película**: Haz clic en el icono de eliminar (papelera) en una tarjeta de película y confirma para borrarla
5. **Buscar películas**: Utiliza el campo de búsqueda para filtrar películas por título, director o género

## Estructura del proyecto

```
movie-app/
│
├── backend/
│   ├── config/
│   │   └── db.js           # Configuración de conexión a MongoDB
│   ├── controllers/
│   │   └── movieController.js # Lógica de negocio para las películas
│   ├── models/
│   │   └── Movie.js        # Modelo de datos para las películas
│   ├── routes/
│   │   └── movies.js       # Rutas de la API para películas
│   ├── .env                # Variables de entorno (no incluido en el repo)
│   ├── package.json        # Dependencias del backend
│   └── server.js           # Punto de entrada del servidor
│
└── frontend/
    ├── public/             # Archivos públicos
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   ├── pages/          # Páginas principales
    │   ├── services/       # Servicios (API)
    │   ├── styles/         # Archivos CSS
    │   ├── App.jsx         # Componente principal
    │   └── main.jsx        # Punto de entrada de React
    ├── .env                # Variables de entorno (no incluido en el repo)
    ├── package.json        # Dependencias del frontend
    └── vite.config.js      # Configuración de Vite
```

## Solución de problemas comunes

### El servidor backend no se inicia

1. Verifica que MongoDB esté en ejecución
2. Asegúrate de que el puerto 5000 no esté en uso por otra aplicación
3. Verifica que el archivo `.env` está correctamente configurado
4. Revisa los logs para errores específicos

### No se pueden guardar películas en la base de datos

1. Verifica la conexión a MongoDB (mira los logs del backend)
2. Asegúrate de que los datos enviados cumplen con las validaciones del modelo
3. Verifica errores en la consola del navegador (F12 > Console)

### Página de "Añadir Película" o "Editar Película" en blanco

1. Verifica errores en la consola del navegador
2. Asegúrate de que todas las dependencias están instaladas correctamente
3. Verifica que las rutas en React Router están correctamente configuradas

### Problemas de CORS

Si ves errores de CORS en la consola:

1. Asegúrate de que el servidor backend está ejecutándose
2. Verifica que la URL en el archivo `.env` del frontend es correcta
3. Asegúrate de que el middleware CORS está configurado correctamente en el backend

## API Endpoints

Si necesitas probar la API directamente:

- `GET /api/movies` - Obtener todas las películas
- `GET /api/movies/:id` - Obtener una película por ID
- `POST /api/movies` - Crear una nueva película
- `PUT /api/movies/:id` - Actualizar una película existente
- `DELETE /api/movies/:id` - Eliminar una película

Ejemplo de datos para crear o actualizar una película:

```json
{
  "title": "El Padrino",
  "director": "Francis Ford Coppola",
  "year": 1972,
  "genre": ["Drama", "Crimen"],
  "duration": 175,
  "rating": 9.2
}
```

## Tecnologías utilizadas

### Backend
- Node.js y Express para la API RESTful
- MongoDB y Mongoose para la base de datos
- dotenv para gestión de variables de entorno
- cors para manejo de CORS

### Frontend
- React para la interfaz de usuario
- React Router para la navegación
- Axios para las peticiones HTTP
- CSS puro para los estilos

## Extensiones y mejoras posibles

- Añadir autenticación de usuarios
- Implementar paginación para grandes conjuntos de datos
- Añadir imágenes para las películas
- Reseñas y calificaciones de usuarios
- Categorización y filtros avanzados

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.