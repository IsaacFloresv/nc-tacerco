'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('UserPreferences', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Preferences',
               key: 'id'
            }
         },
         preferenceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Users',
               key: 'id'
            }
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
         }
      });
   },
   async down(queryInterface) {
      await queryInterface.dropTable('UserPreferences');
   }
};
