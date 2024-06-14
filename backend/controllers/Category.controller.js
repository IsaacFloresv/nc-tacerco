const db = require('../database/models');

const createCategory = async (req, res, next) => {
   try {
      const {
         name,
         description,
      } = req.body;

      const category = await db.Category.create({
         name,
         description
      });

      res.json(category);
   } catch (err) {
      next(err);
   }
};

const getCategory = async (req, res, next) => {
   try {
      const { id } = req.body;

      let query;

      if (id !== undefined) {
         query = await db.Category.findByPk(id, {
            include: [{
               model: db.Preference,
               as: 'preferences' // Alias definido en la asociación del modelo Category
            }]
         });
      } else {
         query = await db.Category.findAll({
            include: [{
               model: db.Preference,
               as: 'preferences' // Alias definido en la asociación del modelo Category
            }]
         });
      }

      res.json(query);
   } catch (err) {
      next(err);
   }
};


//crea una subCategoria (Preferencia)
const createSubcategory = async (req, res, next) => {
   try {
      const { name, description, categoryId } = req.body

      const preference = await db.Preference.create({ name, description, categoryId })

      res.json(preference)
   } catch (err) {
      next(err)
   }
}

module.exports = {
   createCategory,
   getCategory,
   createSubcategory
};
