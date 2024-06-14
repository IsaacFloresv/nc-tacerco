// crea la store
import { create } from 'zustand';
// para la persistencia (localStorage)
import { persist } from 'zustand/middleware';

export const UserStore = create(
   persist(
      // el set sive para guardar datos, el get para traer los datos que ya se encuentran guardados
      (set, get) => ({
         // array con la totalidad de usuarios con que cuente la db
         users: [],
         // para saber si es que hay un usuario ya logueado
         userLogged: null,

         //CREATE- para agregar un usuario
         addUser: (newUser) => {
            // traigo users que hay en el state
            const { users } = get();
            // genero la copia de los usuarios que ya tengo guardados
            let usersCopy = [...users];
            const isArray = Array.isArray(newUser);
            // Dependiendo si renderiza por primera vez recibe [] ,o si solo agrega un usurario, recibe {}
            !isArray
               ? (usersCopy = usersCopy[usersCopy.length] = newUser)
               : (usersCopy = newUser);
            // aca con el set, guarda el nuevo usuario
            set(() => ({ users: usersCopy }));
         },

         // UPDATE _ funcion para actualizar un usuario pero no se si por tiempos y tipo de app vamos a usar esto. tambien a debatir entre el equipo
         updateUser: (userId, updatedUserData) => {
            // obtener todos los usuarios
            const { users } = get();
            // buscar el indice del usuario a actualizar
            const userIndex = users.findIndex((user) => user.id === userId);
            if (userIndex !== -1) {
               // Crear una copia de la lista de usuarios
               const updatedUsers = [...users];
               // Actualizar los datos del usuario en la copia de la lista
               updatedUsers[userIndex] = {
                  ...updatedUsers[userIndex],
                  ...updatedUserData
               };
               // Actualizar el estado del store con la nueva lista de usuarios
               set(() => ({ users: updatedUsers }));
               // console.log("updUser", updatedUserData)
               const userData = {
                  id: updatedUserData.id,
                  email: updatedUserData.email,
                  name: updatedUserData.firstname + updatedUserData.lastname,
                  location: {
                     country: updatedUserData.country,
                     state: updatedUserData.state,
                     city: updatedUserData.city
                  }
               };
               set(() => ({ userLogged: userData }));
            }
         },

         // deberia seguir dandole forma a la logica, pero lo estoy pensando como:

         // si hay un usuario logueado, se va a guardar todos los datos de ese usuario dentro del userLogged (que originalmente esta como null)
         addUserLogged: (user) => {
            set(() => ({ userLogged: user }));
         },

         // en el momento que haga click en cerrar sesion el userLogged debe volver a ser null
         loggOutUser: () => {
            set(() => ({ userLogged: null }));
         },

         // y no se si esta funcion se usara en este proyecto pero tengo entendido que es buena practica dejar la opcion de poder resetear (serviria mas para una funcionalidad del tipo admin). en este caso eso solo lo que haria seria borrar todos los usuarios que existan dentro de nuestro local storage. Pero no se si lo dejaria para este proyecto. definimos luego todo el equipo de frontend que se quiere hacer.
         resetUser: () => {
            set(() => ({ users: [] }));
         }
      }),
      // nombre para el localStorage
      { name: 'usersTAcerco' }
   )
);
