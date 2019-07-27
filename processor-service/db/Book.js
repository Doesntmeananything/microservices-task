const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./sequelize");
const Author = require("./Author");

const Book = sequelize.define("book", {
  title: {
    type: STRING,
    allowNull: false
  },
  pages: {
    type: INTEGER,
    allowNull: false
  }
});

Book.belongsTo(Author, { foreignKey: "authorId", targetKey: "id" });

module.exports = Book;
