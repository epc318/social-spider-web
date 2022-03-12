const { Users } = require("../models");

const userControllers = {
    getAllUsers(req, res) {
        Users.find({})
            .populate({
                path: "friends",
                select: ""
            })
            .select("")
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },





};

module.exports = userControllers;