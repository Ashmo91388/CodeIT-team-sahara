const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    

    // Pass serialized data and session flag into template
    res.render('landing', {
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/project/:id', async (req, res) => {
//   try {
//     const postData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/home', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ["username", "user_avatar"]
      }
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log('homepage posts', posts);
    res.render('homepage', {
      user,
      logged_in: true,
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});

router.get('/profile', async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
  });

  const user = userData.get({ plain: true });
  const postData = await Post.findAll({
    where: {user_id: user.id}
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render('profile', {
    user: user, 
    posts: posts
  })
}) 
module.exports = router;
