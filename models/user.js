const { Schema, model } = require("mongoose");


let validateEmailAdd = function(email) {
    let emailRegEx =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegEx.test(email);
};


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        email: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }]
    },
    {
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "Users"
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);


userSchema.path("email").validate(function(email) {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
}, "Improper format, please enter a valid E-mail address!");


userSchema.virtual("friendNum").get(function() {
    return this.friends.length;
});


const Users = model("Users", userSchema);


module.exports = Users;