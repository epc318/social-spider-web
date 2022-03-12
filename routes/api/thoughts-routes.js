const router = require("express").Router();


const {
    getAllThoughts
} = require("../../controllers/thought-control");


router
    .route("/")
    .get(getAllThoughts);


module.exports = router;