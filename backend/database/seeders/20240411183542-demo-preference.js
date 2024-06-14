'use strict';

module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'Preferences',
         [
            {
               categoryId: 1,
               name: 'Futbol',
               description: 'deporte de dos equipos de 11 jugadores enfrentados'
            },
            {
               categoryId: 1,
               name: 'Voley',
               description: 'equipos de 6 jugadores'
            },
            {
               categoryId: 1,
               name: 'Ciclismo',
               description: 'Deporte individual sobre bicicleta'
            },
            {
               categoryId: 1,
               name: 'Basquet',
               description: 'equipo de 5 jugadores enfrentados'
            },
            {
               categoryId: 1,
               name: 'Pesca',
               description: 'deporte al aire libre'
            },
            {
               categoryId: 2,
               name: 'Comida Argentina',
               description: 'Comida de origen Argentino'
            },
            {
               categoryId: 2,
               name: 'Comida Chilena',
               description: 'Comida de origen Chilena'
            },
            {
               categoryId: 2,
               name: 'Comida Uruguaya',
               description: 'Comida de origen Uruguayo'
            },
            {
               categoryId: 2,
               name: 'Comida Peruana',
               description: 'Comida tipica peruana'
            },
            {
               categoryId: 3,
               name: 'Clasica',
               description: '....'
            },
            {
               categoryId: 3,
               name: 'Jazz',
               description: '.....'
            },
            {
               categoryId: 3,
               name: 'Folclore Argentino',
               description: '......'
            },
            {
               categoryId: 3,
               name: 'Karaoke',
               description: '.......'
            },
            {
               categoryId: 4,
               name: 'Alpinismo',
               description: '.......'
            },
            {
               categoryId: 4,
               name: 'Caminatas en Gupos',
               description: '.......'
            },
            {
               categoryId: 4,
               name: 'Avistamiento de Aves',
               description: '.......'
            },
            {
               categoryId: 5,
               name: 'Juegos Infantiles',
               description: '.......'
            },
            {
               categoryId: 5,
               name: 'Dibujo',
               description: '.......'
            },
            {
               categoryId: 5,
               name: 'Taller para niños',
               description: '.......'
            },
            {
               categoryId: 5,
               name: 'Lectura para niños',
               description: '.......'
            },
            {
               categoryId: 5,
               name: 'Ajedrez',
               description: '.......'
            },
            {
               categoryId: 5,
               name: 'Teatro para Niños',
               description: '.......'
            },
            {
               categoryId: 6,
               name: 'Pintura',
               description: '.......'
            },
            {
               categoryId: 6,
               name: 'Teatro',
               description: '.......'
            },
            {
               categoryId: 6,
               name: 'Fotografia',
               description: '.......'
            },
            {
               categoryId: 6,
               name: 'Ceramica',
               description: '.......'
            },
            {
               categoryId: 6,
               name: 'Taller',
               description: '.......'
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('Preferences', null, {});
   }
};
