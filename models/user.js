const { Schema, model } = require("mongoose");

let validateEmailAdd = function(email) {
    //let emailRegEx =;
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
            validate: [validateEmailAdd, "Improper format, please enter a valid E-mail address!"]
        }
    },
    {
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "comment"
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
        }
    }
);

userSchema.virtual("friendNum").get(function() {
    return this.friends.length;
});

const Users = model("Users", userSchema);

module.exports = Users;