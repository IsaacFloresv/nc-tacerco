const { UserPreference } = require('../database/models');

// obtener todas las UsersPreferences
const getUsersPreferences = async () => {
   const usersPreferences = await UserPreference.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
   });
   return usersPreferences;
};

// Obtener un UsersPreferences mediante su primaryKey
const getUserPreferenceById = async (id) => {
   const userPreference = await UserPreference.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
   });
   return userPreference;
};

// obtener todas los preferencias asociadas a un usuario
const getUserPreferencesByUserId = async (userId) => {
   const usersPreferences = await UserPreference.findAll({
      where: userId,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
   });
   return usersPreferences;
};

module.exports = {
   getUsersPreferences,
   getUserPreferenceById,
   getUserPreferencesByUserId
};
