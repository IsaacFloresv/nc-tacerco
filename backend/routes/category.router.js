const { getCategory, createCategory, createSubcategory } = require('../controllers/Category.controller')

const categoryRouter = require('express').Router()

categoryRouter.get('/', getCategory)
categoryRouter.post('/', createCategory)
categoryRouter.post('/subcategory', createSubcategory)

module.exports = categoryRouter