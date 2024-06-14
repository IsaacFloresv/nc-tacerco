'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class UserEvent extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Asociación con el modelo User
         UserEvent.belongsTo(models.User, {
            foreignKey: 'userId', // Clave foránea en la tabla de UserEvent que referencia al usuario.
            as: 'users' // Alias opcional para la relación
         });

         // Asociación con el modelo Event
         UserEvent.belongsTo(models.Event, {
            foreignKey: 'eventId', // Clave foránea en la tabla de UserEvent que referencia al evento.
            as: 'events' // Alias opcional para la relación
         });
      }
   }
   UserEvent.init(
      {
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'User',
               key: 'id'
            }
         },
         eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Event',
               key: 'id'
            }
         },
         isConfirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
         }
      },
      {
         sequelize,
         modelName: 'UserEvent',
         timestamps: true
      }
   );
   return UserEvent;
};
