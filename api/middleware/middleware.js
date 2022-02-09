const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] to ${req.method} from ${req.originalUrl}`
  );
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
