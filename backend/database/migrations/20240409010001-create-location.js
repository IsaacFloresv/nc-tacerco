'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Locations', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         city: {
            type: Sequelize.STRING,
            allowNull: false
            // unique: true
         },
         state: {
            type: Sequelize.STRING,
            allowNull: false
            // unique: true
         },
         country: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true,
            defaultValue: 'Argentina'
         }
      });
   },
   async down(queryInterface) {
      await queryInterface.dropTable('Locations');
   }
};
