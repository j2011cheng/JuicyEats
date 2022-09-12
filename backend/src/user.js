const Users = require('../data/users');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

// get all users
exports.getUsers = asyncHandler(async(req, res) => {
    const users = await Users.find().select('-password').lean();
    // no users found
    if (!users?.length) {
        return res.status(404).send();
    }
    res.status(200).json(users);
});

// get single user by id
exports.getUser = asyncHandler(async(req, res) => {
    const user = await Users.findById(req.params.id).select('-password').lean();
    // user id not found
    if (!user) {
        return res.status(404).send();
    }
    res.status(200).send(user);
});

// create new user
exports.postUser = async (req, res) => {
    // check for duplicate
    const duplicate = await Users.findOne({ username: req.body.username }).lean().exec();
    if (duplicate) {
        return res.status(409).send();
    }

    const hashPw = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPw;
    const user = await Users.create(req.body);

    if (user) {
        return res.status(201).send();
    }
    res.status(400).send();
};

// update existing user by id
exports.updateUser = async (req, res) => {
    const user = await Users.findById(req.params.id).exec();
    // user id not found
    if (!user) {
        return res.status(404).send();
    }
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    user.roles = req.body.roles || user.roles;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
    const updated = await user.save();
    if (!updated) {
        return res.status(400).send();
    }
    res.status(200).send();
};

// delete user by id
exports.deleteUser = async (req, res) => {
    const user = await Users.findById(req.params.id).exec();
    // user id not found
    if (!user) {
        return res.status(404).send();
    }
    const deleted = await user.deleteOne();
    if (!deleted) {
        return res.status(400).send();
    }
    res.status(200).send();
}
