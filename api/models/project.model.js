const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        placeName: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        goal: {
            type: Number,
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
); 

const Project = mongoose.model('Project', schema);
module.exports = Project;