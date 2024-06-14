'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface) {
      /* Add seed commands here. */
      await queryInterface.bulkInsert(
         'Categories',
         [
            {
               name: 'Deportes',
               description: 'Actividades fisica'
            },
            {
               name: 'Gastronomia',
               description: 'Desgustaciones y Experiencias Culinarias'
            },
            {
               name: 'Musica',
               description: 'Disfrute y practica de musica'
            },
            {
               name: 'Aventuras',
               description: 'Actividades al aire libre'
            },
            {
               name: 'Infancias',
               description: 'Actividades para niños y niñas'
            },
            {
               name: 'Arte',
               description: 'Expresion creativa y coltural'
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      /** Add commands to revert seed here. */
      await queryInterface.bulkDelete('Categories', null, {});
   }
};
