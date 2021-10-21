Sprint 6

Resumen de Entregables:

● Diagrama de base de datos.

● Script de creación de estructura de base de datos con:
	○ Creación de la base de datos y de todas sus tablas.
	○ Tipos de datos de los campos y sus restricciones.
	○ Relaciones entre las diferentes tablas.

● (Opcional) Script de datos de base de datos para:
	○ Tabla de usuarios.
	○ Tabla de productos.
	○ Tablas secundarias (categorías, marcas, colores, talles, etc).
	○ (Opcional) Tabla de carrito de compras y productos de carritos de compras.

● Creación de carpeta Sequelize con:
	○ Archivos de configuración.
	○ Modelos con sus relaciones.

● CRUD
	○ De productos.
	○ De usuarios.
	○ (Opcional) De tablas secundarias.

Estas son las tareas pendientes de completar ademas de las necesarias para cumplimentar los requerimiento de este Sprint:

Todas las vistas:
- Formulario generico para presentar mensajes de error de forma mas elegante.

Vista Productos:
- Aplicar filtros y ordenamiento.

Vista Producto:
- El cliente solo puede informar la cantidad que desea comprar de ese producto. Los demas datos (Sexo, Edad y Color) solo deben ser informados para que los vea el cliente, ya que estan configurados en el producto.

Vista Carrito:
- Mostrar los productos que ha informado el cliente en el carrito.
- Mejorar la presentacion de los datos del producto.
- Completar el formulario de pago con datos reales.
- Criterio para seleccionar las imagenes en "Otros productos similares".

Vistas Internas

Vista listar Productos:
- Agregar botones de editar y borrar en el listado.
- Agregar confirmacion de borrado.
- En la vista de editar agregar next y before.