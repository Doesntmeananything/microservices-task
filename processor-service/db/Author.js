const { STRING, INTEGER, UUID, UUIDV4 } = require("sequelize");
const sequelize = require("./sequelize");
const Book = require("./Book");

const Author = sequelize.define("author", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  age: {
    type: INTEGER,
    allowNull: false
  }
});

Author.hasMany(Book, { foreignKey: "authorId", sourceKey: "id" });

module.exports = Author;
