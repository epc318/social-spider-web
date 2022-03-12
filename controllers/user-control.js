const { Users } = require("../models");


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


    createUser({ body }, res) {
        Users.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },


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