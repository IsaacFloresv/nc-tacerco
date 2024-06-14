'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Users', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         firstName: {
            type: Sequelize.STRING,
            allowNull: false
         },
         lastName: {
            type: Sequelize.STRING,
            allowNull: false
         },
         email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
         },
         password: {
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
      await queryInterface.dropTable('Users');
   }
};
