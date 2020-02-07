const { Pool } = require("pg");

//bulid a connection

const properties = require("./json/properties.json");
const users = require("./json/users.json");
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});


module.exports = pool;