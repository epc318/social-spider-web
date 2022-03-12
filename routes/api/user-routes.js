const router = require("express").Router();


const {
    getAllUsers
} = require("../../controllers/user-control");


router
    .route("/")
    .get(getAllUsers);
    

module.exports = router;