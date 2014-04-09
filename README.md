JSON iNTNGBL TEST   {#welcome}
=====================


Requerimientos
-----------

 1. node ( http://sekati.com/etc/install-nodejs-on-debian-squeeze )
 2. mongobd (http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian)

Obtener una copia del codigo
----------
https://github.com/leninanduin/rest_api_test.git

### Iniciar servidor node

Dentro de la carpeta con los archivos del repo
```
node server.js
```

### Iniciar servidor mongodb

Dentro de la carpeta con los archivos del repo
```
sudo /etc/init.d/mongod start
```

### Consola de pruebas
El archivo html con los formularios necesarios para correr las pruebas 
se encuentra en /rest_api/index.html
http://localhost:3000/

1. Listar usuarios: con el formualrio **Listar usuarios** obtenemos un listado con los usuarios en la BD.
2. Obtener usuario por id: usando el formulario **Get usuario** proporcionando un id de usuario valido, obtenemos la informacion de dicho usuario. se valida que el id exista en la BD.
3. alta de usuario: el formulario **Crear usuario** nos permite agregar un usuario a la BD, se valida que el email no se duplique.
4. **Editar usuario**: proporcionando un id de usuario valido y la nueva informacion de dicho usuario. se valida que el id de usuario sea valido.
5. **Login**: con un email y password se cambia el status logged_in en la BD de un usuario. se valida que el email este registrado.
6. **Logout** se proporciona un email y se cambia el status logged_in en la BD. se valida que el email este registrado.
7. **Eliminar usuario**: proporcionando un id de usuario valido, se elimina toda su informacion de la BD. se verifica que el id sea valido.


