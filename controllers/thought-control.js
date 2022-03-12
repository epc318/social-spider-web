const { Thoughts, Users } = require("../models");


// start thought controllers 
const thoughtControllers = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThotData => res.json(dbThotData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

// get a single thought
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

// create a single thought
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

// update a single thought
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

// delete a single thought
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

// create a reaction to a thought
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

// delete your reaction to a thought
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