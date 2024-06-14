'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Event extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Asociación con el modelo User (un evento pertenece a un creador).
         Event.belongsTo(models.User, {
            foreignKey: 'creatorId', // Clave foránea en la tabla de eventos que referencia al usuario creador.
            as: 'creator' // Alias opcional para la relación
         });

         // Asociación con el modelo User a través de la tabla de unión UserEvent (un evento admite a muchos usuarios).
         Event.belongsToMany(models.User, {
            through: 'UserEvent', // Tabla de union
            foreignKey: 'eventId', // Clave foránea en la tabla de unión que referencia al evento.
            as: 'users' // Alias opcional para la relación
         });

         // Asociacion con el modelo Location (Un evento pertenece a una localidad)
         Event.belongsTo(models.Location, {
            foreignKey: 'locationId',
            as: 'eventLocation'
         });

         // Asociacion con el modelo Preferences (Un evento pertenece a una preferencia??)
         Event.belongsTo(models.Preference, {
            foreignKey: 'preferenceId',
            as: 'preference'
         });

         // Asociacion con el modelo RestrictionEvent (Un Event tiene un grupo de restricciones)
         Event.hasOne(models.RestrictionEvent, {
            foreignKey: 'eventId',
            as: 'restriction'
         });
      }
   }
   Event.init(
      {
         creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'User',
               key: 'id'
            }
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
         },
         description: {
            type: DataTypes.STRING,
            allowNull: false
         },
         address: {
            type: DataTypes.STRING,
            allowNull: false
         },
         locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Location',
               key: 'id'
            }
         },
         preferenceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Preference',
               key: 'id'
            }
         },
         isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
         }
      },
      {
         sequelize,
         modelName: 'Event',
         timestamps: true
      }
   );
   return Event;
};
