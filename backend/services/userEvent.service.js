/* eslint-disable object-shorthand */
const { UserEvent, User, Event/* , Location */ } = require('../database/models');

// obtener todos los UsersEvents
const getUsersEvents = async () => {
   const userEvent = await Event.findAll({
      attributes: { exclude: [ 'creatorId', 'createdAt', 'updatedAt', 'locationId', 'preferenceId' ] },
      include: [
         /*          {
                     model: Location,
                     attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                     as: 'eventLocation',
                  }, */
         {
            model: User,
            attributes: { exclude: [ 'password', 'createdAt', 'updatedAt', 'locationId' ] },
            as: 'creator',
            /*             include: [
                           {
                              model: Location,
                              attributes: { exclude: [ 'password', 'createdAt', 'updatedAt' ] },
                              as: 'location',
                           }, ] */
         },
         {
            model: User,
            attributes: { exclude: [ 'password', 'createdAt', 'updatedAt', 'locationId' ] },
            as: 'users',
         }
      ]
   });
   return userEvent;
};

// Obtener un UsersEvents mediante su primaryKey
const getUserEventById = async (id) => {
   const userEvent = await UserEvent.findAll({
      where: { id },
      attributes: { exclude: [ 'creatorId', 'createdAt', 'updatedAt', 'locationId', 'preferenceId' ] },
      include: [
         /*          {
                     model: Location,
                     attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                     as: 'eventLocation',
                  }, */
         {
            model: User,
            attributes: { exclude: [ 'password', 'createdAt', 'updatedAt', 'locationId' ] },
            as: 'creator',
            /*             include: [
                           {
                              model: Location,
                              attributes: { exclude: [ 'password', 'createdAt', 'updatedAt' ] },
                              as: 'location',
                           }, ] */
         },
         {
            model: User,
            attributes: { exclude: [ 'password', 'createdAt', 'updatedAt', 'locationId' ] },
            as: 'users',
         }
      ]
   });
   return userEvent;
};

// obtener todos los UsersEvents confirmedos / sin confirmar
const getUsersEventsIsConfirmed = async (isConfirmed) => {
   const userEventsConfirmed = await UserEvent.findAll({
      where: { isConfirmed },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [
         {
            model: Event,
            attributes: [ 'name', 'description' ],
            as: 'events',
         }, {
            model: User,
            attributes: [ 'firstName', 'lastName', 'email' ],
            as: 'users'
         }
      ]
   });
   return userEventsConfirmed;
};

// Obtener todos los UsersEvents mediante el userId del usuario asociado
const getUsersEventsByUserId = async (userId) => {
   const usersEventsByUsersId = await UserEvent.findAll({
      where: { userId },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [
         {
            model: Event,
            attributes: [ 'name', 'description' ],
            as: 'events',
         }, {
            model: User,
            attributes: [ 'firstName', 'lastName', 'email' ],
            as: 'users'
         }
      ]
   });
   return usersEventsByUsersId;
};

// Obtener todos los UsersEvents mediante el eventId del evento asociado
const getUsersEventsByEventId = async (eventId) => {
   const usersEventsByEventId = await UserEvent.findAll({
      where: { eventId },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [
         {
            model: Event,
            attributes: [ 'name', 'description' ],
            as: 'events',
         }, {
            model: User,
            attributes: [ 'firstName', 'lastName', 'email' ],
            as: 'users'
         }
      ]
   });
   return usersEventsByEventId;
};

// Obtener todos los UsersEvents mediante el eventId del evento asociado
const getUsersEventsRepeat = async (eventId, userId) => {
   const usersEventsRepeat = await UserEvent.findAll({
      where: { eventId, userId },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [
         {
            model: Event,
            attributes: [ 'name', 'description' ],
            as: 'events',
         }, {
            model: User,
            attributes: [ 'firstName', 'lastName', 'email' ],
            as: 'users'
         }
      ]
   })

   return usersEventsRepeat
};

// Obtener todos los UsersEvents mediante el eventId del evento asociado
const postUsersEvents = async (userEvent) => {
   console.log("Estamos en el Service:", userEvent);

   const resp = await UserEvent.create(userEvent, {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
   });

   console.log("Se guardo el dato en el servicio:", resp)

   return resp;
};

const putUsersEvents = async (userEvent) => {
   const { eventId } = userEvent
   const usersEventsByEventId = await UserEvent.update(userEvent, {
      where: { eventId },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
   });
   return usersEventsByEventId;
};

const deleteUsersEvents = async (params) => {
   const { id } = params
   const usersEvents = await UserEvent.findOne(id);
   return usersEvents.destroy();
};

module.exports = {
   getUsersEvents,
   getUserEventById,
   getUsersEventsRepeat,
   getUsersEventsByUserId,
   getUsersEventsByEventId,
   getUsersEventsIsConfirmed,
   postUsersEvents,
   putUsersEvents,
   deleteUsersEvents
};
