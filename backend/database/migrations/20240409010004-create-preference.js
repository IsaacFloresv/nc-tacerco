'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Preferences', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Categories',
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
         }
      });
   },
   async down(queryInterface) {
      await queryInterface.dropTable('Preferences');
   }
};
