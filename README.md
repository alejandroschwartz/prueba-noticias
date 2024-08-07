# Prueba de Página de noticias

Link al proyecto: [https://prueba-noticias-trece.netlify.app](https://prueba-noticias-trece.netlify.app/)

![](https://res.cloudinary.com/dhdhpvhkg/image/upload/q_80/v1722973000/examen/imagen-app.webp)

## Descripción de las tareas a desarrollar

Clonar esta landing page con sus mismas funcionalidades, tales como:

- Tabla de ganancias

- Formulario con bandera del pais y que si se valide el teléfono con una libreria de validacion de número validos.

- Popup de ganancia

Dar feedback de como lo mejorarias. 

## Desarrollo e instalacion del proyecto

El proyecto lo realicé con HTML, CSS con la libreria de Bootstrap y con Javascript. Utilice el empaquetador de proyectos Webpack con una caonfiguracion rápida para poder desarrolla y realizar un deploy facilmente.

### Para instalarlo, ejecutar:

```js
npm i

npm start
```

Corre en el puerto [http://localhost:3000](http://localhost:3000)

## Mejoras implementadas

- Primero alinear los distintos contenidos, dejando un tamaño maximo para las pantallas más grandes. Tambien mejore el nav para mobile.

- Para los Popup de ganancias,los genere de dos tipos, uno simple (librería toastify-js) que aparece a los 3 segundos y otro lo arme con css, bootstrap para mostrar la imagen y los montos que aparece a los 8 segundos.

- Cambie el diseño de la tabla para que sea mas legible y facil de entender, con los títulos en negritas. Los circulos verdes no aportan, asi que lo cambie por el color en el monto (asumí que era positivo pero podría tener en rojo o negro alguno en perdida o igual). La tabla se actualiza cada 5 segundos, tomando datos aleatorios de un array de personas.

- Para el formulario, quite el background rojo del título, asi lo que más resalta seria el el mismo botón de registrar y lo delimite. Genere el formulario con las validaciones, con el select  de las banderas para el teléfono (librería intl-tel-input) y la validación de los teléfonos (librería libphonenumber-js), mostrando los datos en pantalla al “registrarse ahora”. También el botón de "¡REGISTRARME AHORA!" con el efecto de pulso.

- Verfique las mejoras de lighthouse: Para tener el mejor rendimiento tanto para el usuario como para el posicionamiento SEO en Google.

![](https://res.cloudinary.com/dhdhpvhkg/image/upload/c_scale,q_80,w_1080/v1722978636/examen/imagen-lighthouse.webp)

- Cambié el título para poder incluirlo en un h1 y h2, lo que aumenta la relevancia del contenido para búsquedas específicas. Puse mas margenes entre las distintas secciones. Un alert para delimitar "¡Últimas Oportunidades en Oil Profit!", asi llama mas la atención y lo agrupe mas con el formulario de inscripción para darle un sentido de union. 
