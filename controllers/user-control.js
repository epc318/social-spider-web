const { Users } = require("../models");

//get all users
const userControllers = {
    getAllUsers(req, res) {
        Users.find({})
            .populate({
                path: "friends",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v"
            })
            .select("-__v")
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

//get a single user
    getUserById({ parameters }, res) {
        Users.findOne({ _id: parameters.id })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v"
            })
            .select("-__v")
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "User ID not found, please check input and try again!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

//create a single user
    createUser({ body }, res) {
        Users.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

//update your user 
    updateUser({ parameters, body }, res) {
        Users.findOneAndUpdate({ _id: parameters.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "User ID not found, please check input and try again!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

//delete a user
    deleteUser({ parameters }, res) {
        Users.findOneAndDelete({ _id: parameters.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.json({ message: "User ID not found, please check input and try again!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

//add a friend
    addFriend({ body, parameters }, res) {
        Users.findOneAndUpdate(
            { _id: parameters.userId },
            { $push: { friends: body.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "User ID not found, please check input and try again!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

//delete a friend
    deleteFriend({ parameters }, res) {
        Users.findOneAndUpdate(
            { _id: parameters.userId },
            { $pull: { friends: { id: parameters.friendId } } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "User ID not found, please check input and try again!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};


module.exports = userControllers;