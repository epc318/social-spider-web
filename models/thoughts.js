const { Schema, model, Types } = require("mongoose");
const date = require("../utils/date");


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: {
                minlength: 1,
                maxlength: 280
            }
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
        }
    }
)


const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: {
                maxlength: 280
            }
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

thoughtSchema.virtual("reactionNum").get(function() {
    return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);


module.exports = Thoughts;