'use strict';
module.exports = {
   async up(queryInterface) {
      await queryInterface.bulkInsert(
         'Events',
         [
            {
               creatorId: 1,
               name: 'Pesca en el Río',
               description: 'Jornada de pesca en el Río Paraná',
               address: 'Costanera Sur, Buenos Aires, Argentina',
               locationId: 1,
               preferenceId: 1,
               isActive: true
            },
            {
               creatorId: 2,
               name: 'Partido de Fútbol',
               description: 'Partido amistoso de fútbol en el estadio local',
               address: 'Estadio Monumental, Buenos Aires, Argentina',
               locationId: 2,
               preferenceId: 2,
               isActive: true
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('Events', null, {});
   }
};
