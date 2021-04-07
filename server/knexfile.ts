require("dotenv-flow").config({ path: "../" });

module.exports = {
  client: "pg",
  connection: process.env.DB_URL,
};
