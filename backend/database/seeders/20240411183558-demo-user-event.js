'use strict';

module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'UserEvents',
         [
            {
               userId: 1,
               eventId: 1,
               isConfirmed: true
            },
            {
               userId: 2,
               eventId: 2,
               isConfirmed: true
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('UserEvents', null, {});
   }
};
