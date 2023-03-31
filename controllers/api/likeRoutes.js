const router = require('express').Router();
const { Like, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:postid', withAuth, async (req, res) => {
  try {
    const newLike = await Like.create({
      post_id: req.params.postid,
      user_id: req.session.user_id,
    });

    res.status(200).json(newLike);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router ;