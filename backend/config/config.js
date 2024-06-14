require('dotenv').config();

module.exports = {
   development: {
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 't-acerco-db',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5435,
      dialect: process.env.DB_DIALECT || 'postgres',
      logging: false,
      TOKEN_KEY: process.env.TOKEN_KEY || 'n0t3d1g0'
   },
   test: {
      username: process.env.CI_DB_USERNAME,
      password: process.env.CI_DB_PASSWORD,
      database: process.env.CI_DB_NAME,
      host: process.env.CI_DB_HOST || '127.0.0.1',
      port: 5435,
      dialect: 'postgres'
   },
   production: {
      username: process.env.PROD_DB_USERNAME || 'tacerco',
      password: process.env.PROD_DB_PASSWORD || 'npWxoXbkmo0Hvxx4gQ2mLdP3rdt2z4Yi',
      database: process.env.PROD_DB_NAME || 'tacercodb',
      host: process.env.PROD_DB_HOSTNAME || 'dpg-cocnatnsc6pc73d3do30-a.ohio-postgres.render.com',
      port: process.env.PROD_DB_PORT || 5432,
      dialect: process.env.PROD_DB_DIALECT || 'postgres'
   },

   TOKEN_KEY: 'N0t310d1g0'
};
