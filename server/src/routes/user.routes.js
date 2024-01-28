const express = require('express');
const router = express.Router();
const { isUserTrue } = require('../middlewares/user.middleware');
const { updateUser, deleteUser, getUser, followUser, unfollowUser } = require('../controllers/user.controllers');

router.put('/:id',isUserTrue,updateUser);
router.delete('/:id',isUserTrue,deleteUser);
router.get('/',getUser);
router.put('/follow/:id',followUser);
router.put('/unfollow/:id',unfollowUser);
module.exports = router;
