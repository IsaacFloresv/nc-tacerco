'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Asociacion con el modelo Location (Un user pertenece a una localidad)
         User.belongsTo(models.Location, {
            foreignKey: 'locationId',
            as: 'location'
         });

         // Asociación con el modelo Event (un usuario puede crear muchos eventos).
         User.hasMany(models.Event, {
            foreignKey: 'creatorId', // Clave foránea en el modelo Event que referencia al usuario creador.
            as: 'createdEvents' // Alias opcional para la relación
         });

         // Asociación con el modelo Event a través de la tabla de unión UserEvent (un usuario puede asistir a muchos eventos).
         User.belongsToMany(models.Event, {
            through: 'UserEvent', // Tabla de unión
            foreignKey: 'userId', // Clave foránea en la tabla de unión que referencia al usuario.
            as: 'users' // Alias opcional para la relación
         });

         // Asociacion con el modelo Preference (Un user puede tener muchas preferences)
         User.belongsToMany(models.Preference, {
            through: 'UserPreference',
            foreignKey: 'userId',
            as: 'userPreferences'
         });
      }
   }
   User.init(
      {
         firstName: {
            type: DataTypes.STRING,
            allowNull: false
         },
         lastName: {
            type: DataTypes.STRING,
            allowNull: false
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
         },
         password: {
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
         }
      },
      {
         sequelize,
         modelName: 'User',
         timestamps: true
      }
   );
   return User;
};
