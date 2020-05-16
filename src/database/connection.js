const knex = require("knex");
const configuration = require("../../knexfile");

const enviromentConfig = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(enviromentConfig);

module.exports= connection;