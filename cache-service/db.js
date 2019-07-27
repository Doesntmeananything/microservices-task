const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), "../.env") });

const Sequelize = require("sequelize");

var pg = require("pg");
pg.defaults.ssl = true;

const sequelize = new Sequelize(process.env.DB_URL);

sequelize
  .query(
    "SELECT  author.name, COUNT(*) PageCount FROM authors AS au INNER JOIN books ON  books.authorId = author.id WHERE  books.pages > 200 GROUP BY author.name ORDER BY PageCount DESC",
    { type: sequelize.QueryTypes.SELECT }
  )
  .then(authors => {
    console.log(authors);
  });
