'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Location extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Asociación con el modelo Event (una ubicacion puede contener muchos eventos).
         Location.hasMany(models.Event, {
            foreignKey: 'locationId',
            as: 'event'
         });

         // Asociación con el modelo User (una ubicacion puede contener muchos usuarios).
         Location.hasMany(models.User, {
            foreignKey: 'locationId',
            as: 'user'
         });
      }
   }
   Location.init(
      {
         city: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: true
         },
         state: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: true
         },
         country: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
            defaultValue: 'Argentina'
         }
      },
      {
         sequelize,
         modelName: 'Location',
         timestamps: false
      }
   );
   return Location;
};
