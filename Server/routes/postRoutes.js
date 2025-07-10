const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController } = require('../controllers/postController');

const router = express.Router();

//create post
router.post('/create-post', requireSignIn, createPostController);

//get all routes
router.get('/get-all-post',getAllPostsController)


//get user routes
router.get('/get-user-post',requireSignIn,getUserPostsController)

//delete post controller route
router.delete('/delete-post/:id',requireSignIn,deletePostController)

//update post controller route
router.put('/update-post/:id',requireSignIn,updatePostController)

module.exports = router;
