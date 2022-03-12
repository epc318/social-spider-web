const { Schema, model, Types } = require("mongoose");
const date = require("../utils/date");

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => date(createdAtTime)
        }
    }
);


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => date(createdAtTime)
        },

        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
    },

    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
    }
)



thoughtSchema.virtual("reactionNum").get(function() {
    return this.reactions.length;
});


const Thoughts = model("Thoughts", thoughtSchema);


module.exports = Thoughts;