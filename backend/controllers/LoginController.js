const { TOKEN_KEY } = require('../config/config.js');
const jwt = require('jsonwebtoken');
const { validateUser } = require('./UsersController.js');

let newUser = {};
let users = [];
const { verified } = require('../middlewares/encrypt.js');
const { hash } = require('bcrypt');
const db = require('../database/models');

// validations

const register = async (req, res) => {
   try {
      if (!req.body) {
         res.status(400).send(req.body);
      }
      const { name, email, password } = req.body;
      if (!(email && name && password)) {
         res.status(400).send('Usuario o password incorrectos');
      }

      const userExists = db.User.findOne((user) => user.email === email);

      if (userExists) {
         res.status(400).send(
            'El usuario existe, por favor inicia sesión con tus credenciales'
         );
      }

      const encryptedPassword = await hash(password, 10);
      newUser = users(name, email, encryptedPassword);

      users = [ ...users, newUser ];
   } catch (err) {
      console.log('Ha ocurrido un error', err);
   }

   return res.status(201).json(newUser);
};

const login = async (req, res) => {
   try {
      const resUser = {};
      const { email, password } = req.query;

      if (!(email && password)) {
         res.status(400).send('Usuario o password incorrectos');
      }

      const user = await validateUser(email);

      console.log(user)
      if (user && (await verified(password, user.passHash))) {
         const token = jwt.sign({ location: user.location, id: user.id }, TOKEN_KEY, {
            expiresIn: '2h'
         });
         resUser.id = user.id;
         resUser.email = user.email;
         resUser.name = user.firstname + ' ' + user.lastname;
         resUser.location = user.locationInfo;
         resUser.token = token;

         res.status(200).json(resUser);
      } else {
         res.status(403).send('Credenciales inválidas');
      }
   } catch (err) {
      console.log('Ha ocurrido un error', err);
   }
};

const verifyTokenIsValid = async (req, res) => {
   try {
      const token = req.headers[ 'x-access-token' ];

      const payload = jwt.verify(token, TOKEN_KEY);

      const user = await db.User.findOne({
         attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'locationId'
         ],
         where: {
            id: payload.id
         }
      });

      res.status(200).json(user);
   } catch (err) {
      res.status(422).json({
         message: err
      });
   }
};

module.exports = {
   register,
   login,
   verifyTokenIsValid
};
