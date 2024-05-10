const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("../models/user.model");
const Project = require("../models/project.model");


const schema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Sent", "Rejected", "Accepted"],
            default:"Sent",
            required: true
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        company: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: 'Project',
            required: true
        }
    },
    { 
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
)

const Request = mongoose.model('Request', schema);
module.exports = Request;
