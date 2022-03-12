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
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
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
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
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
    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
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
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId} } },
            { new: true }
        )
            .then(dbThotData => res.json(dbThotData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtControllers;