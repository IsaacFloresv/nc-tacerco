'use strict';

module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'RestrictionEvents',
         [
            {
               eventId: 1,
               eventDate: new Date(),
               startDate: new Date(),
               endDate: new Date(),
               limitDate: new Date(),
               permitChild: true,
               permitPets: false,
               capacity: 100
            },
            {
               eventId: 2,
               eventDate: new Date(),
               startDate: new Date(),
               endDate: new Date(),
               limitDate: new Date(),
               permitChild: false,
               permitPets: true,
               capacity: 50
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('RestrictionEvents', null, {});
   }
};
