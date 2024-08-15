const router = require('express').Router();
const { User, Book } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
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

// GET all books for homepage
router.get('/collection', async (req, res) => {
  //const user = req.session.user_id
  try {
    const dbBookData = await User.findByPk(req.params.id, {
   include: [{ model: Book }]
    });

    const books = dbBookData.map((book) =>
      book.get({ plain: true })
    );
//const books = dbBookData.get({ plain: true })
    res.render('collection', {
      books,
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/collection/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.user_id, {
   include: [{ model: Book }]
    });

    const user = dbUserData.get({
      plain: true
    });
    const books = user.Books.map((book)=> book)
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

router.get('/search', (req, res) => {
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
