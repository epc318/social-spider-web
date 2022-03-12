const { Thoughts, Users } = require("../models");

const thoughtControllers = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThotData => res.json(dbThotData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    getThoughtById({ parameters }, res) {
        Thoughts.findOne({ _id: parameters.id })
        .then(dbThotData => {
            if(!dbThotData) {
                res.status(404).json({ message: "Thought ID not found, please check input and try again!" });
                return;
            }
            res.json(dbThotData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    createThought({ body }, res) {
        Thoughts.create(body)
        .then(dbThoughtData => {
            Users.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true, runValidators: true }
            )
            return res.json(dbThoughtData);
        })
        .then(dbThotData => res.json(dbThotData))
        .catch(err => res.status(400).json(err));
    },


    updateThought({ parameters, body }, res) {
        Thoughts.findOneAndUpdate({ _id: parameters.id }, body, { new: true, runValidators: true })
        .then(dbThotData => {
            if(!dbThotData) {
                res.status(404).json({ message: "Thought ID not found, please check input and try again!"});
                return;
            }
            res.json(dbThotData);
        })
        .catch(err => res.status(400).json(err));
    },


    deleteThought({ parameters }, res) {
        Thoughts.findOneAndDelete({ _id: parameters.id })
            .then(dbThotData => {
                if(!dbThotData) {
                    res.json({ message: "Thought ID not found, please check input and try again!" });
                    return;
                }
                res.json(dbThotData);
            })
            .catch(err => res.status(400).json(err));
    },


    createReaction({ parameters, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: parameters.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThotData => {
                if(!dbThotData) {
                    res.json({ message: "Thought ID not found, please check input and try again!" });
                    return;
                }
                res.json(dbThotData);
            })
            .catch(err => res.status(400).json(err));
    },


    deleteReaction({ parameters }, res) {
        Thoughts.findOneAndUpdate(
            { _id: parameters.thoughtId },
            { $pull: { reactions: { reactionId: parameters.reactionId} } },
            { new: true }
        )
            .then(dbThotData => res.json(dbThotData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtControllers;