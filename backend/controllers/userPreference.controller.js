const usersPrefencesService = require('../services/userPreference.service');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const { ErrorObject } = require('../helpers/error');

module.exports = {
   getAllUsersPreferences: catchAsync(async (_, res) => {
      try {
         const usersPrefences = await usersPrefencesService.getUsersPreferences();

         if (!usersPrefences) {
            throw new ErrorObject(
               'No se pudo obtener las relaciones de usersPrefences',
               500
            );
         }

         endpointResponse({
            res,
            status: 'success',
            message: 'Exito al obtener usersPrefences',
            body: { usersPrefences }
         });
      } catch (error) {
         endpointResponse({
            res,
            status: error.status || 'error',
            code: error.statusCode || 500,
            message: error.message || 'Error al obtener usersPrefences'
         });
      }
   }),

   getUserPreferenceById: catchAsync(async (req, res) => {
      try {
         const { id } = req.params;
         if (!id) {
            throw new ErrorObject('El id no es valido', 500);
         }
         const userPrefence = await usersPrefencesService.getUserPreferenceById(id);
         if (!userPrefence) {
            throw new ErrorObject('El userPrefence no existe', 404);
         }

         endpointResponse({
            res,
            status: 'success',
            message: 'Exito al obtener usersPrefences',
            body: { userPrefence }
         });
      } catch (error) {
         endpointResponse({
            res,
            status: error.status || 'error',
            code: error.statusCode || 500,
            message: error.message || 'Error al obtener un usersEvents por id'
         });
      }
   })
};
