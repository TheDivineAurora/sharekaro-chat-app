const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USER_ROLE = require('../enums/userRoles.enums');

const UserSchema = new mongoose.Schema({

    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: [true, "name is required!"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: (name) => `${name.value} is not a valid name!`
        },
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "invalid email format!"
        },
    },
    password: {
        type: String,
        required: false,
        select: false,
        minLength: [6, "Password too short!"],
    },
    username: {
        type: String,
        unique: true,
        required: false,
        validator: function (value) {
            return /^[a-zA-Z0-9]+$/.test(value);
        },
        message: 'Username must contain only alphabets and numbers',
    },
    profileImage: {
        type: String,
        default:"",
    },
    coverPicture: {
        type: String,
        default:"",
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    posts:{
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: "",
        max:200,
    },
    relationship: {
        type: Number,
        enum: [1,2,3],
    },
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.generateToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
        expiresIn: '7d',
    });
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.updateUsername = async function (username) {
    this.username = username;
    await this.save();
}

module.exports = mongoose.model("users", UserSchema);