/* eslint-disable object-shorthand */
const { encrypt, verified } = require('../middlewares/encrypt.js');
const db = require('../database/models');
// Metodos CRUD

// Mostrar todos los registros
const getUsers = async (req, res, next) => {
   try {
      const { id } = req.query;
      let query;

      if (id !== undefined) {
         query = await db.User.findByPk(id, { attributes: { exclude: [ 'createdAt', 'updatedAt' ] } });
      } else {
         query = await db.User.findAll({ attributes: { exclude: [ 'createdAt', 'updatedAt' ] } });
      }

      res.json(query);
   } catch (error) {
      next({
         message: 'No fue posible obtener la informacion',
         res: false
      });
   }
};

// Registrar un nuevo usuario
const createUsers = async (req, res, next) => {
   try {
      let { location, password, firstName, lastName, email } = req.body;

      if (password) {
         const pass = req.body.password;
         const hpass = await encrypt(pass);
         password = hpass;
      }

      const idlocation = await db.Location.create(location);
      const locationId = idlocation.id;



      const user = await db.User.create({
         firstName,
         lastName,
         password,
         email,
         locationId
      });

      console.log(user)

      const resUser = {};
      const locationInfo = {}
      console.log(user.dataValues);
      if (user) {
         resUser.id = user.dataValues.id;
         resUser.email = user.dataValues.email;
         resUser.firstname = user.dataValues.firstName;
         resUser.lastname = user.dataValues.lastName;
         locationInfo.id = user.dataValues.locationId;
         locationInfo.contry = location.contry;
         locationInfo.state = location.state;
         locationInfo.city = location.city;
         resUser.locationInfo = locationInfo;

         console.log(resUser);
         res.json(resUser);
      } else {
         console.log(resUser);
         res.json({ message: 'No fue posible guardar la informacion' });
      }
   } catch (error) {
      next({ message: 'No fue posible guardar la informacion', res: false });
   }
};

// Actualizar
const updateUsers = async (req, res, next) => {
   try {
      const { password, firstName, lastName, email, location } = req.body;
      const ruser = {}
      console.log("Esto es lo que ingresa: ", req.body)

      const userdata = await validateUser(email);
      if (userdata) {
         const id = userdata.location;
         ruser.firstName = firstName
         ruser.lastName = lastName
         ruser.email = email
         location.id = id;
      }

      await db.Location.update(location, {
         where: { id: location.id }
      });
      ruser.locationId = location.id;


      if (!(password)) {
         ruser.password = userdata.passHash;
         console.log("1ro If: ", password);
      } else if (!(await verified(password, userdata.passHash))) {
         const pass = password;
         const hpass = await encrypt(pass);
         console.log("2do If: ", hpass);
         ruser.password = hpass;
      } else {
         const pass = password;
         const hpass = await encrypt(pass);
         console.log("3er If: ", hpass);
         ruser.password = hpass;
      }

      const resp = await db.User.update(ruser,
         {
            where: { id: userdata.id }
         }
      )

      console.log("Esta es la resp: ", resp)

      res.json({
         message: 'El usuario se actualizo correctamente',
         res: true,
         body: resp
      });
   } catch (error) {
      next({
         message: 'No fue posible actualizar la informacion',
         res: false,
         error: error
      });
   }
};

// Eliminar
const deleteUsers = async (req, res, next) => {
   try {
      const reqUser = req.body;
      console.log(reqUser.email);
      const user = await db.User.findOne({ where: { email: reqUser.email } });

      user.destroy();

      return res.json({
         message: 'El usuario se elimino correctamente',
         body: user.firstName + ' ' + user.lastName
      });
   } catch (error) {
      next(error);
   }
};

// Validacion de usuario
const validateUser = async (email) => {
   let user = {};
   try {
      const resUser = await db.User.findOne({
         attributes: [ 'id', 'password', 'email', 'locationId', 'firstName', 'lastName' ],
         where: { email: email }
      });

      if (resUser) {
         user.id = resUser.dataValues.id;
         user.passHash = resUser.dataValues.password;
         user.email = resUser.dataValues.email;
         user.location = resUser.dataValues.locationId;
         user.firstname = resUser.dataValues.firstName;
         user.lastname = resUser.dataValues.lastName;
         user.locationInfo = await db.Location.findByPk(resUser.locationId);

         return user;
      } else {
         return (user = {});
      }
   } catch (error) {
      return error.message;
   }
};

module.exports = {
   getUsers,
   createUsers,
   updateUsers,
   deleteUsers,
   validateUser
};
