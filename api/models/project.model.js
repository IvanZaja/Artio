const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')

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
        beneficts: {
            type: [String],
            required: true
        },
        additionalDetails: {
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
        coverImg: {
            type: String,
            required: true,
            default: 'https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
        },
        goal: {
            type: Number,
            required: true
        },
        amountReceived: {
            type: Number,
            default: 0,
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
        },
        country: {
            type: String,
            enum: ["Brazil", "Indonesia", "Pakistan", "United States", "India", "Colombia", "Peru"],
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        collaborators: {
            type: [mongoose.Types.ObjectId],
            ref: 'User'
        },
        investors: {
            type: [mongoose.Types.ObjectId],
            ref: 'User'
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

schema.index({ location: "2dsphere" });

const Project = mongoose.model('Project', schema);
module.exports = Project;