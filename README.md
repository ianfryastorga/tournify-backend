### Para levantar el proyecto:
* 1) Crear una carpeta env a la altura de /src, donde estarán los archivos ``` api_movil.env``` y ``` db_movil.env```
* 2) Correr el siguiente comando: ```docker compose --file docker-compose.dev.yml build``` y luego ```docker compose --file docker-compose.dev.yml up```

### Variables de entorno:
#### api_movil.env:
```
NODE_ENV=development
DB_USERNAME = <usuario>
DB_PASSWORD = <contraseña>
DB_NAME = app_movil
DB_HOST = db_movil
PORT=3000
JWT_SECRET=<clave_secreta_segura>
SALT_ROUNDS=10
```
#### db_movil.env:
```
POSTGRES_USER = <usuario>
POSTGRES_PASSWORD = <contraseña>
POSTGRES_DB=app_movil
```


## Endpoints disponibles (README actualizado: 17 Oct):
##### Puede que README no está actualizado y endpoint(s) que existe no está en la lista de abajo
#### Torneo:
POST  
GET  
GET /:id  
PATCH /:id  

#### Usuario:
POST /signup  
GET  
GET /:id  

#### Partido:
POST  
GET  
GET /:id  


