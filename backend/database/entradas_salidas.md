### VENTANA HOME:

#### Usuario sin registrar

#### Prerequisitos:

-  haber seleccionada una provincia y una localidad ???

#### Datos que se cargan con la ventana:

##### Categorias

{
"categories": [
{
"id": 1,
"nombre": "Deportes",
"descripcion": "Actividad fisica"
},
{
"id":2,
"nombre": "Gastronomia",
"descripcion": "Degustaciones"
},
{
"id": 3,
"nombre": "Música",
"descripcion": "Escuchar, comentar o practicar"
},
{
"id": 4,
"nombre": "Aventura",
"descripcion": "Actividad fisica al aire libre"
},
{
"id": 5,
"nombre": "Infancias",
"descripcion": "Actividad fisica"
},
{
"id": 6,
"nombre": " Arte",
"descripcion": "Actividad fisica"
}
 ]
}

##### Provincias

{"states":[
{ "id": 0, "provincia": "Córdoba" },
{ "id": 1, "provincia": "Mendoza" },
{ "id": 2, "provincia": "Buenos Aires" },
{ "id": 3, "provincia": "Catamarca" },
{ "id": 4, "provincia": "La Rioja" },
{ "id": 5, "provincia": "Chubut" },
{ "id": 6, "provincia": "Entre Ríos" },
{ "id": 7, "provincia": "Formosa" },
{ "id": 8, "provincia": "Jujuy" },
{ "id": 9, "provincia": "Misiones" },
{ "id": 10, "provincia": "Neuquén" },
{ "id": 11, "provincia": "Río Negro" },
{ "id": 12, "provincia": "Tucumán" },
{ "id": 13, "provincia": "Salta" },
{ "id": 14, "provincia": "San Luis" },
{ "id": 15, "provincia": "San Juan" },
{ "id": 16, "provincia": "Santa Fe" },
{ "id": 17, "provincia": "Corrientes" },
{ "id": 18, "provincia": "Chaco" },
{ "id": 19, "provincia": "La Pampa" },
{ "id": 20, "provincia": "Santa Cruz" },
{ "id": 21, "provincia": "Santiago del Estero" },
{ "id": 22, "provincia": "Tierra del Fuego, Antártida e Islas del Atlántico Sur" },
{ "id": 23, "provincia": "Ciudad Autónoma de Buenos Aires" }
]}

#### Datos solicitados por el usuario al manipulas las opciones categoria y provincia

##### Al seleccionar Categoria se envia la consulta a la api con el parametro categoryId lo que traer los siguientes datos:

##### Ejemplo con categoryId = 1:

{
"id":1,
"categoryId":1,
"nombre":"Soccer",
"descripcion":"Equipos de 11 personas"
},{
"id":2,
"categoryId":1,
"nombre":"Bolibol",
"descripcion":"Equipos de 6 personas"
},{
"id":3,
"categoryId":1,
"nombre":"Pescar",
"descripcion":"Captura de pesca en agua dulce o salada"
},{
"id":4,
"categoryId":1,
"nombre":"Beisbol",
"descripcion":"Equipos de 20 personas"
},{
"id":5,
"categoryId":1,
"nombre":"Ciclismo",
"descripcion":"Ciclismo deportivo a nivel de competencia"
}
