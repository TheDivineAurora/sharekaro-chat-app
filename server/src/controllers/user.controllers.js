const User = require('../models/user.models');
const bcrypt = require("bcrypt");
const {
    response_201,
    response_500,
    response_400,
    response_200,
    response_401,
    response_404,
    response_403,
} = require("../utils/responseCodes.utils");

//update user
exports.updateUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userExists = await User.findById(userId);
        if (!userExists) {
            return response_400(res, "User not found");
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const user = await User.findByIdAndUpdate(req.body.userId, {
            $set: req.body,
        });
        return response_200(res, "Account has been updated");
    } catch (error) {
        console.log(error);
        return response_500(res, "Error updating user", error);
    }
}
//delete user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userExists = await User.findById(userId);
        if (!userExists) {
            return response_400(res, "User not found");
        }
        const user = await User.findByIdAndDelete(req.body.userId);
        return response_200(res, "Account has been deleted");
    } catch (error) {
        console.log(error);
        return response_500(res, "Error deleting user", error);
    }
}

//get a user
exports.getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId? await User.findById(userId) : await User.findOne({username: username});
        if (!user ){
            return response_400(res, "User not found");
        }
        const { password, ...other } = user._doc;
        return response_201(res, "User Details", user);
    } catch (error) {
        console.log(error);
        return response_500(res, "Error getting user", error);
    }
}
//follow a user
exports.followUser = async (req, res) => {

    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return response_400(res, "User not found");
            }
            const currentUser = await User.findById(req.body.userId);
            if (!currentUser) {
                return response_400(res, "User not found");
            }
            if(!user.followers.includes(req.body.userId)){
              await user.updateOne({
                $push : {followers: req.body.userId}
              });
              await currentUser.updateOne({
                $push : {followings: req.params.id}
              });

              return response_200(res,"Followed Succesfully");
            }
            else{
                return response_403(res,"You are already following this user");
            }
        } catch (error) {
            console.log(error);
            return response_500(res, "Error following the user", error);
        }
    }
    else {
        return response_403(res, "You cannot follow yourself")
    }

}
//unfollow a user
exports.unfollowUser = async (req, res) => {

    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return response_400(res, "User not found");
            }
            const currentUser = await User.findById(req.body.userId);
            if (!currentUser) {
                return response_400(res, "User not found");
            }
            if(user.followers.includes(req.body.userId)){
              await user.updateOne({
                $pull : {followers: req.body.userId}
              });
              await currentUser.updateOne({
                $pull : {followings: req.params.id}
              });

              return response_200(res,"Unollowed Succesfully");
            }
            else{
                return response_403(res,"You are not following this user");
            }
        } catch (error) {
            console.log(error);
            return response_500(res, "Error unfollowing the user", error);
        }
    }
    else {
        return response_403(res, "You cannot unfollow yourself")
    }

}