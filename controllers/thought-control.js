const { Thoughts } = require("../models");

const thoughtRoutes = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },




    
};

module.exports = thoughtRoutes;