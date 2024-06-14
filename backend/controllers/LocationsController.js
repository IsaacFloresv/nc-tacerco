const db = require('../database/models/index');
const { encrypt } = require('bcrypt'); // revisar
// Metodos CRUD

// Mostrar todos los registros
const getLocations = async (req, res, next) => {
   try {
      const { id } = req.params;
      let query;

      if (id !== undefined) {
         query = await db.Location.findByPk(id);
      } else {
         query = await db.Location.findAll();
      }

      res.json(query);
   } catch (error) {
      next(error);
   }
};

// Registrar un nuevo usuario
const createLocations = async (req, res, next) => {
   try {
      const { contry, state, city } = req.body;

      if (contry || state || city) {
         const location = await db.Location.create({
            contry,
            state,
            city
         });

         res.json(location);
      }
   } catch (error) {
      next(error);
   }
};

// Actualizar
const updateLocations = async (req, res, next) => {
   try {
      const { id, contry, state, city } = req.body;
      console.log(req.body);
      const resp = await db.Location.update(
         { contry, state, city },
         {
            // eslint-disable-next-line object-shorthand
            where: { id: id }
         }
      );

      res.json(resp);
   } catch (error) {
      next(error);
   }
};

// Eliminar
const deleteLocations = async (req, res, next) => {
   try {
      const id = req.body.id;

      const user = await db.Location.findByPk(id);

      user.destroy();

      return res.json({
         message: 'El registro se elimino correctamente'
      });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getLocations,
   createLocations,
   updateLocations,
   deleteLocations
};
