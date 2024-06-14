'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Events', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         creatorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Users',
               key: 'id'
            }
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
         },
         description: {
            type: Sequelize.STRING,
            allowNull: false
         },
         address: {
            type: Sequelize.STRING,
            allowNull: false
         },
         locationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Locations',
               key: 'id'
            }
         },
         preferenceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Preferences',
               key: 'id'
            }
         },
         isActive: {
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
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Events');
   }
};
