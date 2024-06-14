/* Esta función toma un objeto como argumento que contiene varios parámetros 
opcionales para personalizar la respuesta otorgadas desde los controllers. */

const endpointResponse = ({ res, code = 200, status = true, message, body, options }) => {
   res.status(code).json({
      status,
      code,
      message,
      body,
      options
   });
};

module.exports = {
   endpointResponse
};
