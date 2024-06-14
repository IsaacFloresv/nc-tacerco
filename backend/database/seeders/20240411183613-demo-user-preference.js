'use strict';

module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'UserPreferences',
         [
            {
               userId: 1,
               preferenceId: 1
            },
            {
               userId: 2,
               preferenceId: 2
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('UserPreferences', null, {});
   }
};
