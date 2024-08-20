const router = require('express').Router();
const { User, Book, Swap } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Book,
        limit: 3,
      }],
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/swaps', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [ { 
        model: Swap,
        include: [
          { model: User, foreignKey: 'borrowerId', as: 'borrower' },
          { model: User, foreignKey: 'borrowerId', as: 'lender' },
          { model: Book },
        ],
      }]
    });

    const user = userData.get({ plain: true });

    res.render('swaps', {
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/collection/:user_id?', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.user_id || req.session.user_id, {
      include: [{ model: Book }]
    });

    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    const user = dbUserData.get({
      plain: true
    });
    const books = user.books.map((book)=> book)
//const books = dbBookData.get({ plain: true })
    res.render('collection', {
      books,
      viewUser: user,
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching user collections' });
  }
});



router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/search', withAuth, (req, res) => {
  const query = req.query.query;
  // Perform search logic here
  // const userId = req.session.user_id
  res.render('search', {
    userId: req.session.user_id
  });
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('register');
});
module.exports = router;
