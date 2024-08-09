const User = require('./User');
const Book = require('./Book');

Book.belongsTo(User,{
  foreignKey: 'userId'
})

User.hasMany(Book, {
  foreignKey:'userId'
})
module.exports = { User, Book };
