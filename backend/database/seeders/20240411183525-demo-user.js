'use strict';

const bcrypt = require('bcrypt');

module.exports = {
   async up(queryInterface) {
      const passwordHash = await bcrypt.hash('password123', 10); // Hash de ejemplo para la contraseña 'password123'

      await queryInterface.bulkInsert(
         'Users',
         [
            {
               firstName: 'John',
               lastName: 'Doe',
               email: 'johndoe@example.com',
               password: passwordHash,
               locationId: 1
            },
            {
               firstName: 'Jane',
               lastName: 'Smith',
               email: 'janesmith@example.com',
               password: passwordHash,
               locationId: 2
            },
            {
               firstName: 'Luis',
               lastName: 'Miguel',
               email: 'luismiguel@example.com',
               password: passwordHash,
               locationId: 1
            },
            {
               firstName: 'Gustavo',
               lastName: 'Cerati',
               email: 'gustavocerati@example.com',
               password: passwordHash,
               locationId: 2
            },
            {
               firstName: 'Nicola',
               lastName: 'Tesla',
               email: 'nicolatesla@example.com',
               password: passwordHash,
               locationId: 2
            }
         ],
         {}
      );
   },

   async down(queryInterface) {
      await queryInterface.bulkDelete('Users', null, {});
   }
};
