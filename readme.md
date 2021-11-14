![Logo](https://github.com/vasili-hugo/grupo_02_sportal/blob/master/public/imgs/sportal_logo_000.png)

# Bienvenidos al proyecto sportal

El portal de compras de indumentaria deportiva para los **Guerreros urbanos** que saben lo que quieren y que necesitan lo mejor para sus entrenamientos y eventos competitivos.</br>
Los **Guerreros urbanos** son personas jóvenes y de mediana edad, con buen poder adquisitivo y una agenda cargada.</br>
Son personas informadas, con un nivel educativo de medio a alto.</br>
Pueden consumir para si mismos o comprar para un familiar directo, para apoyarlo en su desarrollo deportivo o para hacer un regalo para una ocasión especial.


**EQUIPO**
--------------------------

## Mariel Méndez (abandona el curso antes de finalizar el primer sprint)
Es profesora de Historia egresada de la Universidad Nacional de Tres de Febrero, donde cursó también la licenciatura. Combina la labor docente con tareas de gestión cultural, contando con 10 años de experiencia en instituciones públicas como Museo Evita, Complejo Teatral de BsAs/Teatro San Martín y el Museo Histórico Nacional. 

## Sergio Perin
Ingeniero Aeronáutico graduado en la Universidad Tecnológica Nacional (UTN) en 1985.</br>
Posgrado en Ingeniería de Sistemas graduado en la Universidad de Buenos Aires (UBA) en 1990.</br>
Consultoria, analisis, desarrollo de sistemas para usuarios finales y/o desarrolladores.</br>
Lenguajes de programación: Assembler, PickBasic, C, VB, VB.Net, C#.Net desde 1986.

## Luciano De Palma
Estudia ingeniería en computación en la Universidad Nacional de Tres de Febrero.
Actualmente trabajando en atención al cliente en un comercio de indumentaria deportiva hace más de 10 años.

## Hugo Vasiliev
Es diseñador gráfico con años de experiencia profesional. Actualmente dirige un equipo de diseñadores en un medio gráfico y se especializa en: **infografía** -  **análisis y procesamiento de datos** (científicos, económicos y espaciales) y en **visualización de información**.  También se desempeña cómo ilustrador 2d, 3d - motion graphics, fotógrafo y editor periodístico.


**VISTAS QUE CONFORMAN EL PROYECTO**

- root o home -> index.ejs<br>
- productos   -> productos.ejs<br>
- producto    -> producto.ejs<br>
- carrito     -> carrito.ejs<br>
- login       -> login.ejs<br>
- registro    -> register.ejs<br>

**VISTAS QUE CONFORMAN LA EDICION Y/O CREACION DE PRODUCTOS**

- listado     -> listarProductos.ejs<br>
- edición     -> editarProducto.ejs<br>
- creación    -> crearProducto.ejs<br>

**OTRAS VISTAS QUE CONFORMAN EL PROYECTO**

- perfil      -> userProfile.ejs<br>
- errores     -> error.ejs<br>
- /partials   -> Carpeta con las vistas parciales para formar las vistas principales.<br>

Para su ejecución local se debe clonar el proyecto desde https://github.com/vasili-hugo/grupo_02_sportal-02.git. Luego instale sus dependencias con npm install.<br>
Para este sprint 5 se efectuaron los ABM/CRUD de las BD JSON de usuarios y productos, las vistas, routers y controllers que los administran.<br>
Para correr el proyecto abra una consola y ejecute [node | nodemon] bin\www.<br>
Desde el browser (Google Chrome, Mozilla Firefox o Microsoft Edge) url http://localhost:3000.<br>
La pagina de edición/creación de productos no tiene destinado (por el momento) un link desde donde pueda ser vista. Para poder verla url http://localhost:3000/productos/listar.

Para el sprint 6 se efectuó el reemplazo de los archivos de datos en formato JSON por el uso de bases de datos.<br>
Para establecer los avances de cada sprint se dispuso que cada sprint presentado a partir de este momento tendrá su propio repositorio en GitHub. Para este nuevo sprint se debe ingresar a https://github.com/vasili-hugo/grupo_02_sportal-03-s06.git.<br>
En particular se utiliza el motor de base de datos MySQL a través del ORM Sequelize.<br>
Clonar el proyecto y previamente instalar la base de datos.<br>
Para la importación de la BD se debe tener instalado cualquier cliente que permita manipular una BD (tipo MySQL). Sugerimos DBeaver o MySQL Workbench.<br>
Para comenzar, crear el schema con el nombre 'sportal' y a continuación importar las tablas y datos mediante el archivo sportal_db.sql.<br>
El archivo sportal_db.xml dispone el Diagrama Entidad Relación en formato XML. Sugerimos el producto draw.io para poder visualizarlo.<br>
Para acceder al listado de productos para su edición y/o creación se deberá acceder como administrador.<br>
Para ello crear un usuario y posteriormente, acceder a la BD mediante cualquiera de los cliente mencionados, y cambiar el campo 'is_admin' con el valor '1' en la tabla Users.

Para el sprint 7 se agregaron las validaciones del front-end. No se han utilizado paquetes adicionales para este sprint, ya que solo se ha utilizado JavaScript.<br>
Se han corregido algunos bugs y se implementaron tareas pendientes.

**REFERENCIAS CONSULTADAS PARA EL PROYECTO**

- [SoloDeportes](https://www.solodeportes.com.ar/) 
- [OpenSports](https://www.opensports.com.ar/) 
- [Adidas](https://www.adidas.com.ar/) 
- [Nike](https://www.nike.com/ar/) 
- [Puma](https://us.puma.com/)
- [Asics](https://www.asics.com/es/es-es/) 
- [Rebook](https://www.reebok.com/us) 

- New Balance</br>
- Under Armour</br>
- Fila</br>
- Mizuno</br>
- Topper<br>
- Gap