'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('UserEvents', {
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
               model: 'Users',
               key: 'id'
            }
         },
         eventId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Events',
               key: 'id'
            }
         },
         isConfirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
      await queryInterface.dropTable('UserEvents');
   }
};
