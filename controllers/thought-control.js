const { Thoughts } = require("../models");

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
                res.status(404).json({ message: "Though ID not found, please check input and try again!" });
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
        .then(dbThotData => res.json(dbThotData))
        .catch(err => res.status(400).json(err));
    },


    updateThought({ parameters, body }, res) {
        Thoughts.findOneAndUpdate({ _id: parameters.id }, body, { new: true, runValidators: true })
        .then(dbThotData => {
            if(!dbThotData) {
                res.status(404).json({ message: "Though ID not found, please check input and try again!"});
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
                    res.json({ message: "Though ID not found, please check input and try again!" });
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
                    res.json({ message: "Though ID not found, please check input and try again!" });
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