const Post = require('../models/post.models');
const User = require('../models/user.models');
const {
    response_201,
    response_500,
    response_400,
    response_200,
    response_401,
    response_404,
    response_403,
} = require("../utils/responseCodes.utils");

//create a post
exports.createPost = async (req, res) => {

    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return response_403(res, "User not found");
        }
        req.body.createdBy = req.body.userId;
       
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
    
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { posts: savedPost._id }
        })
        return response_201(res, "Post created successfully", savedPost);
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error creating post')
    }
}
//update a post
exports.updatePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);   
        if (!post) {
            return response_403(res, "Post not found");
        }     
        const isPostCreator = post.createdBy ===  req.body.userId;    
        if(!isPostCreator){
            return response_400(res,"You can only update your post");
        }    
        await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })    
        return response_200(res, "Post updated successfully");
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error updating post')
    }
}
//delete a post
exports.deletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);    
        if (!post) {
            return response_403(res, "Post not found");
        }     
        const isPostCreator = post.createdBy ===  req.body.userId;    
        if(!isPostCreator){
            return response_400(res,"You can only delete your post");
        }    
        await User.findByIdAndUpdate(req.body.userId, {
            $pull: { posts: req.params.id }
        })    
        await Post.findByIdAndDelete(req.params.id);
        return response_201(res, "Post deleted successfully");
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error deleting post')
    }
}
//like a post
exports.likePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);    
        if (!post) {
            return response_403(res, "Post not found");
        }       
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({
                $push: {likes: req.body.userId}
            })  
            return response_201(res, "Post liked successfully");
        }
        else{
            await post.updateOne({
                $pull: {likes: req.body.userId}
            })  
            return response_201(res, "Post disliked successfully");
        }
        
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error liking post')
    }
}

//get a post
exports.getPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);    
        if (!post) {
            return response_403(res, "Post not found");
        }       
        return response_200(res, "Post details",post);
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error getting post')
    }
}

//get all post of user
exports.getAllPosts = async (req, res) => {

    try {   
        const currentUser = await User.findOne({username: req.params.username});
        if(!currentUser){
            return response_403(res,"User not Found");
        }
        const userPosts = await Post.find({createdBy: currentUser._id});
        return response_200(res, "Post details",userPosts);
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error getting post')
    }
}
//user timeline
exports.getTimeline = async (req, res) => {

    try {   
        const currentUser = await User.findById(req.params.id);
        const userPosts = await Post.find({createdBy: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({ createdBy: friendId});
            })
        )
        return response_200(res, "Post details",userPosts.concat(...friendPosts));
    } catch (error) {
        console.log(error);
        return response_500(res, 'Error getting post')
    }
}