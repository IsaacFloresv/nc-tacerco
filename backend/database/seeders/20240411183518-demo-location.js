'use strict';

module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'Locations',
         [
            {
               city: 'Buenos Aires',
               state: 'Buenos Aires',
               country: 'Argentina'
            },
            {
               city: 'Córdoba',
               state: 'Córdoba',
               country: 'Argentina'
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('Locations', null, {});
   }
};
