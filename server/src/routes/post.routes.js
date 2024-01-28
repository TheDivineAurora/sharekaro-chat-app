const express = require('express');
const { createPost, deletePost, updatePost, likePost, getPost, getTimeline, dislikePost, getAllPosts } = require('../controllers/post.controller');
const router = express.Router();




router.post("/",createPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);
router.put("/like/:id",likePost);
router.get("/:id",getPost);
router.get("/profile/:username",getAllPosts);
router.get("/timeline/:id",getTimeline);
module.exports = router;
