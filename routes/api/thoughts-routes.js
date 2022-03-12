const router = require("express").Router();


const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-control");


router
    .route("/")
    .get(getAllThoughts)
    .post(createThought);

    
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


router
    .route("/:thoughtId/reactions")
    .put(createReaction);


router
    .route("/:thoughtId/:reactionId")
    .delete(deleteReaction);


module.exports = router;