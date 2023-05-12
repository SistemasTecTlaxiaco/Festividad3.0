# Bienvenido a OpenBooks 📖
---
OpenBooks es un smart contract que parte de la idea de que todo el conocimiento y la información debe ser libre para todos. Este proyecto permite a los usuarios publicar documentos, libros, etc. en un ambiente completamente descentralizado y así permitir a otros usuarios obtener los recursos facilmente sin tener que visitar cientos de páginas diferentes hasta conseguir el recurso que buscaban.
Las funcionalidades principales del contrato son las siguientes:
* Subir un libro (además, guarda el usuario de la persona que lo sube como "Contribuyente").
* Obtener todos los libros.
* Obtener un libro en específico.
* Obtener lista de contribuyentes.
* Eliminar la lista de libros.
* Eliminar un libro en específico.
* Vaciar la lista de contribuyentes.
* Buscar un contribuyente por su usuario.

## Cómo utilizar este contrato ❔
---
### Pré-requisitos ❕
1. Debe tener [Nodejs](https://nodejs.org/en/) instalado en su versión 12.0 o mayor.
2. Debe tener instalado [Yarn](https://yarnpkg.com/). Para saber si lo tiene, ejecute el comando ```yarn --version ```. En caso de no tenerlo, puede instalarlo ejecutando el comando ```sudo npm install -g yarn```
3. Instale las dependencias de yarn ejecutando ```yarn install```
4. Debe tener una cuenta en la [testnet de NEAR](https://wallet.testnet.near.org/)
5. Debe tener [NEAR-CLI](https://github.com/near/near-cli) instalado globalmente en su ordenador. Para saber si ya lo tiene instalado, ejecute ```near --version```. En caso de no tenerlo, instálelo ejecutando el comando ```sudo npm install -g near-cli``` 

Ya tenemos todo lo que necesitamos para probar nuestro contrato inteligente. Ahora vamos a ejecutarlo.

## Instalación 📖🐱‍💻
---
1. Clone el repositorio ```git clone git@github.com:sebasvivas1/OpenBooks.git && cd OpenBooks```
2. Vamos a iniciar sesión en nuestra wallet que creamos anteriormente: ```near login```
3. Dentro del repositorio, instalemos las dependencias del proyecto ejecutando ```npm install```, tranquilo, esto puede tomar unos segundos.
4. Si quieres desplegar el contrato y probar sus funciones, puedes hacerlo con ```yarn deploy:dev``` esto le devolverá un conjunto de caracteres que empezarán por "dev-" seguido por numeros generados por la red. Guárdelo, lo necesitará si quiere probar los métodos del contrato inteligente.
5. Por último, si queremos ejecutar los tests desarrollados, podemos hacerlo ejecutando ```yarn test```
   
## Llamadas al Contrato 
---
Algunos de los metodos que podemos ejecutar son los siguientes
- Cargar un libro 
  ```bash
  near call dev-<tu numero de contrato> uploadBook '{"name": "Name of the Book", "description": "Description of the Book", "image": "This is the image of the Book", "file": "File of the Book", "author": "Author of the Book", "language": "english", "publisher": "publisher of the book"}' --accountId <tu_user.testnet>
  ```
- Buscar todos los libros 
  ```bash
  near call dev-<tu numero de contrato> getBooks --accountId <tu_user.testnet>
  ```
- Buscar un libro en especifico
```bash
  near call dev-<tu numero de contrato> getBook '{"bookIndex": i32}' --accountId <tu_user.testnet>
  ```
- Eliminar un libro
```bash
  near call dev-<tu numero de contrato> deleteBook '{"bookIndex": i32}' --accountId <tu_user.testnet>
  ```
- Donar al proyecto
```bash
  near call dev<tu numero de contrato> donateToProject --accountId <tu_user.testnet> --amount i32
  ```
- Buscar los contribuyentes 
  ```bash
  near call dev-<tu numero de contrato> getContributors --accountId <tu_user.testnet>
    ```
- Buscar un contribuyente por nombre de usuario 
  ```bash
  near call dev-<tu numero de contrato> findContributor '{"contributorUser": "usuario.testnet"}' --accountId <tu_user.testnet>
    ```

## Mockup de Figma 🎨📖
Abre este [enlace](https://www.figma.com/file/3NKKf6JKrRXON8Q7yoFX1N/OpenBooks?node-id=0%3A1) para abrir la propuesta de diseño de la Dapp.

## Authors
- [Sebastian Vivas](https://github.com/sebasvivas1)
- [Jose Alfredo Roman Cruz](https://github.com/josealfredo79)
