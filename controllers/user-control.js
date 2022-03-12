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
    getUserById({ params }, res) {
        Users.findOne({ _id: params.id })
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
    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
    deleteUser({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
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
    addFriend({ body, params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
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
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { id: params.friendId } } },
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