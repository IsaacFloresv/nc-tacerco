'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Category extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Una categoria tiene muchas preferencias
         Category.hasMany(models.Preference, {
            foreignKey: 'categoryId',
            as: 'preferences'
         });
      }
   }
   Category.init(
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false
         },
         description: {
            type: DataTypes.STRING,
            allowNull: false
         }
      },
      {
         sequelize,
         modelName: 'Category',
         timestamps: false
      }
   );
   return Category;
};
