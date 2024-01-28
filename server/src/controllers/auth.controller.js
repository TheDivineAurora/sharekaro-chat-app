const User = require("../models/user.models.js");
const {
    response_201,
    response_500,
    response_400,
    response_200,
    response_401,
    response_404,
} = require("../utils/responseCodes.utils");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body
        if (!name || !email || !password || !username) {
            return response_400(res, "Missing required fields");
        }
        const emailExists = User.findOne({ email: email }).exec();
        if (!emailExists) {
            return response_400(res, "email is already in use");
        }
        const usernameExists = User.findOne({ username: username }).exec();
        if (!usernameExists) {
            return response_400(res, "username is already in use");
        }

        const user = new User({
            name: name,
            email: email,
            password: password,
            username: username,
        })

        const savedUser = await user.save();

        const token = await savedUser.generateToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        });


        return response_201(res, "User Created Successfully", {
            name: savedUser.name,
            username: savedUser.username,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return response_500(res, "Error creating user", error);
    }

}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return response_400(res, "Missing required fields");
        }
        

        const userExists = await User.findOne({ email: email }).select("name password username").exec();

        if (!userExists) {
            return response_400(res, "User not found");
        }
        
        const passwordMatch = await userExists.comparePassword(password);
        if (!passwordMatch) {
            return response_401(res, "Invalid Password");
        }
        
        const token = await userExists.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        })
        
        const user = await User.findOne({email});
        const data = {
            ...user._doc,
            token: token,
        }
        return response_201(res, "Logged in Successfully", data);
    } catch (error) {
        console.log(error);
        return response_500(res, "Error logging in", error);
    }
}
