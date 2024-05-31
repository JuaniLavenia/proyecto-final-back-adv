# BIBLIOTECA RC

Proyecto final del curso Especializacion en Backend con node.js.
Se trata de un sistema para una Biblioteca, donde el cliente puede administrar sus libros y puede ofrecer la venta y alquiler de los mismos, asi como tambien los usuarios podran registrarse para realizar las transacciones de los libros.

## Instalación

Instrucciones paso a paso sobre cómo instalar el proyecto.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuaniLavenia/proyecto-final-back-adv.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd nombre-del-proyecto
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Variables de entorno

Para correr este proyecto, es necesario añadir las siguientes variables de entorno:

`MONGODB_URI`
`PORT`
`JWT_SECRET`
`SESSION_SECRET`
`GITHUB_CLIENT_ID`
`GITHUB_CLIENT_SECRET`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`

## Running Tests

Para correr los tests, ejecutar el siguiente comando:

```bash
  npm run test
```

## Caracteristicas

- C.R.U.D. Libros
- C.R.U.D. Usuarios
- Autenticacion de usuarios (Login y Registro)
- Estrategias de logeo/registro con Google y Github
- Compra y Alquiler de libros (Utilizando transacciones)

## Tecnologias utilizadas

Node, Express

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@JuaniLavenia](https://github.com/JuaniLavenia)
- [@CarlaAlcorta](https://github.com/carlial)
- [@AugustoBrito](https://github.com/djauguust)
