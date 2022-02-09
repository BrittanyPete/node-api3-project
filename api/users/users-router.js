const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({
      message: 'could not get list of users'
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(newUser => {
    res.status(201).json(newUser)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params;
  Users.update(id, req.body)
  .then(updateUser => {
    res.status(200).json(updateUser);
  })
});

router.delete('/:id',  validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  const user = await Users.getById(id);
    await Users.remove(id);
    res.json(user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  await Users.getById(id);
  const postComments = await Users.getUserPosts(id);
  res.status(200).json(postComments);    
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post)
    })
});

// do not forget to export the router
module.exports = router;