import Knex from "knex";
const config = require("../knexfile");

const knex = Knex(config);
export default knex;
