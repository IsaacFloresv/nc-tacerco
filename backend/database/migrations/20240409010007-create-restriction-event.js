'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('RestrictionEvents', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         eventId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Events',
               key: 'id'
            }
         },
         eventDate: {
            type: Sequelize.STRING,
            allowNull: true
         },
         startDate: {
            type: Sequelize.DATE,
            allowNull: false
         },
         endDate: {
            type: Sequelize.DATE,
            allowNull: false
         },
         limitDate: {
            type: Sequelize.STRING,
            allowNull: true
         },
         permitChild: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
         },
         permitPets: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
         },
         capacity: {
            type: Sequelize.INTEGER,
            allowNull: false
         }
      });
   },
   async down(queryInterface) {
      await queryInterface.dropTable('RestrictionEvents');
   }
};
