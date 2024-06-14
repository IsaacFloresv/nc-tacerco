'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class UserPreference extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         UserPreference.belongsTo(models.User, {
            foreignKey: 'userId', // Clave foránea en la tabla de UserPrefence que referencia al usuario.
            as: 'users' // Alias opcional para la relación
         });

         // Asociación con el modelo Preferences
         UserPreference.belongsTo(models.Preference, {
            foreignKey: 'preferenceId', // Clave foránea en la tabla de UserPrefence que referencia a las preferencias.
            as: 'preferences' // Alias opcional para la relación
         });
      }
   }
   UserPreference.init(
      {
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'User',
               key: 'id'
            }
         },
         preferenceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Prefence',
               key: 'id'
            }
         }
      },
      {
         sequelize,
         modelName: 'UserPreference',
         timestamps: true
      }
   );
   return UserPreference;
};
