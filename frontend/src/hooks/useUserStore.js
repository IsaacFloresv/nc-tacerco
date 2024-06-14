import {
   fetchUsers,
   updateUser as updateUserService,
   addUser as addUserService,
   logginApi,
   getOneUser
} from '../service';
import { UserStore } from '../store/UserStore';

export function useUserStore() {
   const { addUser, addUserLogged, userLogged } = UserStore();

   const getUserApiResponse = async () => {
      try {
         const userApiResponse = await fetchUsers();
         addUser(userApiResponse);
      } catch (error) {
         console.error('Error fetching users:', error);
      }
   };

   const getOneUserApiResponse = async () => {
      try {
         const oneUserApiResponse = await getOneUser();
         addUserLogged(oneUserApiResponse);
      } catch (error) {
         console.error('Error fetching one user by id:', error);
      }
   };

   const validationUserToLogin = async (userToLogin) => {
      try {
         const userApiResponse = await logginApi(userToLogin);
         return userApiResponse;
      } catch (error) {
         console.error('Error logging in:', error);
         throw error;
      }
   };

   const addUserFromRegister = async (newUser) => {
      try {
         const userApiResponse = await addUserService(newUser);
         console.log('User added successfully:', userApiResponse);
      } catch (error) {
         console.error('Error adding user:', error);
         throw error;
      }
   };

   const updateUserDetails = async (userId, updatedUserData) => {
      try {
         const updatedUser = { ...userLogged, ...updatedUserData };
         await updateUserService(userId, updatedUserData);
         addUserLogged(updatedUser);
      } catch (error) {
         console.error('Error updating user details:', error);
         throw error;
      }
   };

   return {
      getUserApiResponse,
      validationUserToLogin,
      addUserFromRegister,
      updateUserDetails,
      getOneUserApiResponse
   };
}
