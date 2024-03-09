# Farm

Proyecto desarrollado usando Full Stack MEAN (MongoDB, Express, Angular, Node.js)

Este proyecto es una aplicación donde el usuario permita gestionar la asociación de animales en corrales en una granja.

Para esta parte, se tiene las siguientes características:

* **Almacenamiento:** MongoDB

* **Backend:** Node.js Express
  
* **Frontend:** Angular

## Backend
La sección del backend se fundamenta en Node.js para el desarrollo de aplicaciones, además, la inclusión de Swagger UI proporciona una interfaz gráfica amigable para interactuar con los servicios, simplificando la documentación y permitiendo utilizar fácilmente los puntos finales de la API.

**URL del Backend:** http://localhost:5000/api/v1/docs

![image](https://github.com/jeanaray13/farm/blob/main/snapshots/Backend.jpg)

## Frontend
La sección del frontend se fundamenta en Angular para el desarrollo de aplicaciones basada en TypeScript en la que permite visualizar de manera gráfica las pantallas que utilizará el cliente proporcionando una interfaz gráfica amigable y reutilizable con capacidad para actualizar solo las partes necesarias simplificando la creación de componentes visuales y lógicas asociadas en un solo lugar.
Para más detalles de las pantallas se pueden observar dentro de la carpeta "snapshots": https://github.com/jeanaray13/farm/tree/main/snapshots

**URL del Frontend (Login):** http://localhost:4200

![image](https://github.com/jeanaray13/farm/blob/main/snapshots/Login.png)

**URL del Frontend (Menú Principal):** http://localhost:4200/farm

![image](https://github.com/jeanaray13/farm/blob/main/snapshots/Main.png)

## Requerimientos

* **Node.js:** https://nodejs.org/en/download

## Ejecución Backend

1. Clonar el proyecto:

`git clone https://github.com/jeanaray13/farm.git`

2. Instalar las dependencias:
   
`npm install`

3. Ejecutar la aplicación:

`npm run servidor`

## Ejecución Frontend

1. Tener previo el paso 1 de la sección "Ejecución Backend"

2. Acceder a la sección del frontend dentro de la carpeta "frontend-farm":
   
`cd frontend-farm`

3. Instalar las dependencias:
   
`npm install`

4. Ejecutar la aplicación:

`npx ng serve -o`
