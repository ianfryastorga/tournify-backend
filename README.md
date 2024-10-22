### Para levantar el proyecto:
* 1) Crear una carpeta env a la altura de /src, donde estarán los archivos ``` api_movil.env``` y ``` db_movil.env```
* 2) Correr el siguiente comando: ```docker compose --file docker-compose.dev.yml build``` y luego ```docker compose --file docker-compose.dev.yml up```

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


