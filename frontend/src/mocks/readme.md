archivo providerData.js cuenta con funciones para servir los datos, estas serian las siguientes:

1.- providerStates(): devuelve un arreglo de objetos con los datos de las provincias o estados de la siguiente manera:

    states: [
    { id: 0, provincia: 'Córdoba' },
    { id: 1, provincia: 'Mendoza' },
    { id: 2, provincia: 'Buenos Aires' },
    { id: 3, provincia: 'Catamarca' },
    { id: 4, provincia: 'La Rioja' },
    { id: 5, provincia: 'Chubut' },
    {....},
    ]

2.- providerCitys(stateId): devuelve un arreglo de objetos con los datos de las ciudades de la provincia pasando el stateId como parametro:

    Citys: [
    { id: 0, city: 'Almirante Brown' },
    { id: 1, city: 'Avellaneda' },
    { id: 2, city: 'Bahía Blanca' },
    { id: 3, city: 'Berazategui' },
    { id: 4, city: 'Berisso' },
    { id: 5, city: 'Coronel de Marina Leonardo Rosales' },
    { id: 6, city: 'Chascomús' },
    { id: 7, city: 'Ensenada' },
    { id: 8, city: 'Escobar' },
    { ... },
    ]

3.- providerCategory(): devuelve un arreglo de objetos con los datos de las categorias:

    Categories: [
    { id: 0, city: 'Almirante Brown' },
    { id: 1, city: 'Avellaneda' },
    { id: 2, city: 'Bahía Blanca' },
    { id: 3, city: 'Berazategui' },
    { id: 4, city: 'Berisso' },
    { id: 5, city: 'Coronel de Marina Leonardo Rosales' },
    { id: 6, city: 'Chascomús' },
    { id: 7, city: 'Ensenada' },
    { id: 8, city: 'Escobar' },
    { ... },
    ]

4.- providerSubCategories(category): devuelve un arreglo de objetos con los datos de las subcategorias(preferencias):

    {"preferencias":[{
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
    }
    { ... },
    ]}
