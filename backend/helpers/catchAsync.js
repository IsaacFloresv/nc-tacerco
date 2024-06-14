/* Este código define una función llamada catchAsync, que se utiliza para envolver otras 
funciones asíncronas (aquellas que devuelven una promesa) en un bloque de manejo de errores. */

const catchAsync = (fn) => (req, res, next) => {
   fn(req, res, next).catch(next);
};

module.exports = {
   catchAsync
};
