'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class RestrictionEvent extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         // Asociacion con el modelo Event (Una restriccion pertenece a un event)
         RestrictionEvent.belongsTo(models.Event, {
            foreignKey: 'eventId',
            as: 'event'
         });
      }
   }
   RestrictionEvent.init(
      {
         eventId: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         eventDate: {
            type: DataTypes.STRING,
            allowNull: true
         },
         startDate: {
            type: DataTypes.DATE,
            allowNull: false
         },
         endDate: {
            type: DataTypes.DATE,
            allowNull: false
         },
         limitDate: {
            type: DataTypes.STRING,
            allowNull: true
         },
         permitChild: {
            type: DataTypes.BOOLEAN,
            allowNull: true
         },
         permitPets: {
            type: DataTypes.BOOLEAN,
            allowNull: true
         },
         capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
         }
      },
      {
         sequelize,
         modelName: 'RestrictionEvent',
         timestamps: false
      }
   );
   return RestrictionEvent;
};
