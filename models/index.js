const User = require('./User');
const Book = require('./Book');
const Swap = require('./Swap');

Book.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Book, {
  foreignKey: 'userId',
});

User.hasMany(Swap, {
  foreignKey: 'lenderId',
});

User.hasMany(Swap, {
  foreignKey: 'borrowerId',
});

Book.hasMany(Swap, {
  foreignKey: 'bookId',
});

Swap.belongsTo(User, {
  foreignKey: 'lenderId',
  as: 'lender',
});

Swap.belongsTo(User, {
  foreignKey: 'borrowerId',
  as: 'borrower',
});

Swap.belongsTo(Book, {
  foreignKey: 'bookId',
});

module.exports = { User, Book, Swap };
