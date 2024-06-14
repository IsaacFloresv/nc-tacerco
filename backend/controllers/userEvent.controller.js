const usersEventsService = require('../services/userEvent.service');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const { ErrorObject } = require('../helpers/error');

module.exports = {
   getUsersEvents: catchAsync(async (_, res) => {
      try {
         const usersEvents = await usersEventsService.getUsersEvents();

         if (!usersEvents) {
            throw new ErrorObject('No se pudo obtener las relaciones de UserEvents', 500);
         }

         endpointResponse({
            res,
            status: 'success',
            message: 'Exito al obtener usersEvents',
            body: { usersEvents }
         });
      } catch (error) {
         endpointResponse({
            res,
            status: error.status || 'error',
            code: error.statusCode || 500,
            message: error.message || 'Error al obtener usersEvents'
         });
      }
   }),

   getUsersEventsById: catchAsync(async (req, res) => {
      try {
         let msg = ''
         console.log(req.query)
         let userEvent = {}

         if (!req.query.userId && !req.query.eventId) {
            throw new ErrorObject('El id no es valido', 500);
         }

         if (req.query.userId) {
            const { userId } = req.query;
            userEvent = await usersEventsService.getUsersEventsByUserId(userId);
            msg = "Eventos donde se registro el usuario."

            if (!userEvent) {
               throw new ErrorObject('El usuario no existe', 404);
            }
         }

         if (req.query.eventId) {
            const { eventId } = req.query;
            userEvent = await usersEventsService.getUsersEventsByEventId(eventId);
            msg = "Usuarios registrados en el Evento."

            if (!userEvent) {
               throw new ErrorObject('El evento no existe', 404);
            }
         }

         endpointResponse({
            res,
            status: 'success',
            message: msg,
            body: { userEvent }
         });
      } catch (error) {
         endpointResponse({
            res,
            status: error.status || 'error',
            code: error.statusCode || 500,
            message: error.message || 'Error al obtener un usersEvents por id'
         });
      }
   }),

   getUsersEventsIsConfirmed: catchAsync(async (req, res) => {
      try {
         const { isConfirmed } = req.params;
         console.log(isConfirmed);
         if (isConfirmed !== 'true' && isConfirmed !== 'false') {
            throw new Error('Parametro invalido', 500);
         }
         const userEvent =
            await usersEventsService.getUsersEventsIsConfirmed(isConfirmed);

         endpointResponse({
            res,
            status: 'success',
            message: 'Exito al obtener usersEvents',
            body: { userEvent }
         });
      } catch (error) {
         endpointResponse({
            res,
            status: error.status || 'error',
            code: error.statusCode || 500,
            message: error.message || 'Error al obtener un usersEvents'
         });
      }
   }),




   // Registrar un usuario en un evento
   postUserEvent: catchAsync(async (req, res) => {
      try {
         console.log(req.body);
         const { userId, eventId, isConfirmed } = req.body;
         let userEvent = {}
         let msg = ''
         let estado = ''
         let codigo = ''

         const isCreated = await usersEventsService.getUsersEventsRepeat(eventId, userId)
         console.log(isCreated);

         if (!(isCreated.length)) {
            userEvent = await usersEventsService.postUsersEvents({
               userId, eventId, isConfirmed
            });
            msg = "Usuario agregado"
            estado = 'success'
            codigo = 200
         } else {
            msg = 'Usuario o Evento incorrectos'
            estado = 'Bad Request'
            codigo = 400
         }

         if (userEvent) {
            console.log(userEvent);
            endpointResponse({
               res,
               status: estado,
               code: codigo,
               message: msg,
               body: { userEvent }
            });
         } else {
            console.log(userEvent);
            res.json({ message: 'No fue posible guardar la informacion' });
         }
      } catch (error) {
         return ({ message: 'No fue posible guardar la informacion', res: false });
      }
   }),



   // Actualizar el registro de un usuario en  un evento
   putUserEvent: catchAsync(async (req, res) => {
      const { userId, eventId, isConfirmed } = req.body;
      try {

         const userEvent = await usersEventsService.putUsersEvents({
            userId, eventId, isConfirmed
         });

         console.log(userEvent)


         if (userEvent) {
            console.log(userEvent);
            endpointResponse({
               res,
               status: 'success',
               message: 'Operacion exitosa',
               body: { userEvent }
            });
         } else {
            console.log(userEvent);
            res.json({ message: 'No fue posible guardar la informacion' });
         }
      } catch (error) {
         return ({ message: 'No fue posible guardar la informacion', res: false });
      }
   }),

   deletetUsersEvents: catchAsync(async (req, res) => {
      try {
         let msg = ''
         console.log(req.query)
         let userEvent = {}

         if (!req.query.userId && !req.query.eventId) {
            throw new ErrorObject('El id no es valido', 500);
         }

         if (req.query.userId) {
            const { userId } = req.query;
            userEvent = await usersEventsService.deleteUsersEvents(userId);
            msg = "Usuario eliminado con exito"

            if (!userEvent) {
               throw new ErrorObject('El usuario no existe', 404);
            }
         }

         if (req.query.eventId) {
            const { eventId } = req.query;
            userEvent = await usersEventsService.deleteUsersEvents(eventId);
            msg = "Evento eliminado con exito"

            if (!userEvent) {
               throw new ErrorObject('El evento no existe', 404);
            }
         }

         endpointResponse({
            res,
            status: 'success',
            message: msg,
            body: { userEvent }
         });
      } catch (error) {
         endpointResponse({
            res,
            status: error.status || 'error',
            code: error.statusCode || 500,
            message: error.message || 'Error al obtener los datos por id'
         });
      }
   }),

};
