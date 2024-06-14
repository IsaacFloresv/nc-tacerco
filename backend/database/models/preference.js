'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Preference extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Muchas preferencias pertenecen a una categoria
         Preference.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
         });

         // Una preferencia pertenece a muchos eventos
         Preference.belongsToMany(models.Event, {
            through: 'UserPreference',
            foreignKey: 'preferenceId',
            as: 'preferenceEvents'
         });

         // Una preferencia pertenece a muchos usuarios
         Preference.belongsToMany(models.UserPreference, {
            through: 'UserPreference',
            foreignKey: 'preferenceId',
            as: 'eventUsers'
         });
      }
   }
   Preference.init(
      {
         categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Category',
               key: 'id'
            }
         },
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
         modelName: 'Preference',
         timestamps: false
      }
   );
   return Preference;
};
