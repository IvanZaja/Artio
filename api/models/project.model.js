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
            required: true,
            default: 'https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
        },
        goal: {
            type: Number,
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
                default:"Point"
            },
            coordinates: {
                type: [Number],
                required: true,
                default: [0,0]
            },
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                ret.location = ret.location.coordinates.reverse();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
); 

const Project = mongoose.model('Project', schema);
module.exports = Project;