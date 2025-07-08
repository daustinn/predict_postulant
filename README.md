# 🧠 Predict Postulant - Setup

## 📋 Requisitos Generales

- **MySQL** 8 o superior
- **Python** 3.10 o superior
- **Node.js** 22 o superior
- **pnpm** (opcional, puedes usar `npm`)

## 📦 Base de datos

Requiere MySQL 8 o superior.

```bash
# Ejecutar el script de creación de la base de datos y tablas
./query_mysql.sql
```

## 📦 Backend (FastAPI)

1. Clonar el repositorio:

```bash
git clone https://github.com/daustinn/predict_postulant.git
```

2. Navegar al directorio del backend:

```bash
cd python-service
```

3. Crear un entorno virtual

```bash
python -m venv venv
```

4. Activar el entorno virtual

```bash
venv\Scripts\activate
```

5. Instalar las dependencias

```bash
pip install -r requirements.txt
```

6. Configurar las credenciales de la base de datos
   ` Editar el archivo src/db.py`

```bash
# DATABASE_URL= mysql+pymysql://usuario:contraseña@localhost:3306/045
```

7. Iniciar el servidor FastAPI

```bash
uvicorn main:app --reload
```

8. Verificar que el servidor está corriendo en [http://localhost:8000/api/ping](http://localhost:8000/api/ping)

## 🖥️ Frontend (Next.js 15)

1. Navegar al directorio del frontend:

```bash
cd frontend-service
```

2. Instalar las dependencias con pnpm (o npm):

```bash
pnpm install
```

3. Iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

4. Acceder a la aplicación en [http://localhost:3000](http://localhost:3000)
