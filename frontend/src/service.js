// porq me resulta mas simple pense los llamados a la api por axios, de querer hacerlo con axios hay que hacer el npm i. sino se pueden modificar por fetch, que creo que me comentaste betty que estabas mas familiarizada y en ese caso como en todo lo que crean ambos (david y bea), siempre metan mano al codigo sin problemas.
// Y todo lo q van a ver hasta el momento aca son supuestas llamadas con supuestos datos ya q aun no tenemos los endpoints, sino q me los fui inventando como para ir codeando algo y luego simplemnte cambiar todo con los datos reales.
import axios from 'axios';

const baseUrl = 'https://s14-04-m-node-react-k5y9.onrender.com/api/v1';

export const Api = axios.create({
   baseURL: baseUrl,
   headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
   }
});

// Devuelve lo que hay en el endPoint de usuarios
export const fetchUsers = async () => {
   try {
      const { data } = await Api.get('/users');
      console.log('Data de usuarios desde el service :', data);
      return data;
   } catch (err) {
      console.log(err);
   }
};

// Crear user agregando el enpoint
export const addUser = async (newUser) => {
   try {
      console.log('newUser desde el service :', newUser);
      await Api.post(
         'https://s14-04-m-node-react-k5y9.onrender.com/api/v1/users',
         newUser
      );
   } catch (err) {
      console.log('errors en : ', err);
   }
};

// tengo que pensar como hago, ya que el id de maria es el 7. si yo hago la llamada al users/7 que es el id de maria, me trae los datos de maria y yo podria cotejar

// Solo trae uno con un email y el password que ya no es strign sino number por lo q tengo entendido y hay q cambiar la logica
export const logginApi = async (userToLogin) => {
   try {
      const { data } = await Api.get('/login', userToLogin);
      console.log('desde el service login la data es :', data);
      return data;
   } catch (err) {
      console.log('errors en login de usuarios Service: ', err);
   }
};

// para traer un usuario con id
export const getOneUser = async (userId) => {
   try {
      const { data } = await Api.get(`/users/?id=${userId}`);
      console.log('USUARIO LOGIN ID', data);
      return data;
   } catch (err) {
      console.log('Errors en:', err);
   }
};

// con un id, que es string borra el user
export const deleteUser = async (id) => {
   try {
      await Api.delete(`/users/${id}`);
   } catch (err) {
      console.log('Errors en:', err);
   }
};

// Recibe infoUser, y en base al id, lo reenvia para edit
export const updateUser = async (infoUser) => {
   try {
      console.log('el usuario a editar entero en el service :', infoUser);
      await Api.put(`/users/${infoUser.id}`, infoUser);
   } catch (err) {
      console.log('errors en : ', err);
   }
};

// EVENTOS
// devuelve todos los eventos
export const fetchEvents = async () => {
   try {
      const { data } = await Api.get(`/events`);
      console.log('todos los eventos service:', data);
      return data;
   } catch (err) {
      console.log('errors en : ', err);
   }
};

// devuelve todas las categorias y subcategorias
export const fetchCategoriesComplete = async () => {
   try {
      const { data } = await Api.get(`/category`);
      // console.log('todas las categorias service:', data);
      return data;
   } catch (err) {
      console.log('errors en : ', err);
   }
};

export const fetchCategory = async () => {
   try {
      const { data } = await Api.get(
         `https://s14-04-m-node-react-k5y9.onrender.com/api/v1/category`
      );
      console.log('todos las categorias:', data);
      return data;
   } catch (err) {
      console.log('errors en : ', err);
   }
};

// crea un evento
export const addEvent = async (newEvent) => {
   //POST https://s14-04-m-node-react-k5y9.onrender.com/api/v1/events
   try {
      console.log('newEvent desde el service :', newEvent);
      await Api.post(
         'https://s14-04-m-node-react-k5y9.onrender.com/api/v1/events',
         newEvent
      );
   } catch (err) {
      console.log('errors en : ', err);
   }
};

// borra un evento
export const deleteEventByIdService = async (id) => {
   try {
      const { data } = await Api.delete(`/events/deleteEvent/${id}`);
      console.log(data);
   } catch (err) {
      console.log('Errors en:', err);
   }
};

// editar evento se hace? no me quedo claro, pero podria ser algo asi
export const updateEvent = async (item) => {
   try {
      await Api.put(`/events/${item.id}`, item);
   } catch (err) {
      console.log('Errors en:', err);
   }
};
