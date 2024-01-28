const User = require('../models/user.models')
const {
    response_201,
    response_500,
    response_400,
    response_200,
    response_401,
    response_404,
} = require("../utils/responseCodes.utils");

async function isUserTrue(req,res,next){
    try {
        if(req.params.id == req.body.userId || req.user.isAdmin){
            next();
        }
        else{
           return response_403(res,"You can only update your account!!");
        }
    } catch (error) {
        console.log(error);
        return response_500(res,"Failed to verify user",error);
    }
}


module.exports = { isUserTrue };