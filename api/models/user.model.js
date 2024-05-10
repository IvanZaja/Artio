const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Project = require('./project.model');
const bcrypt = require('bcrypt');

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: 'https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
        },
        role: {
            type: String,
            enum: ["company", "host"],
            default: "host"
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                ret.projects = ret.projects || [];
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt
            .hash(this.password, 10)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next)
    } else {
        next();
    }
});

schema.method('checkPassword', function (password) {
    return bcrypt.compare(password, this.password)
});

schema.virtual('projects', {
    ref: 'Project', // Modelo
    localField: '_id', // Mi campo que tiene la N
    foreignField: 'owner', // El nombre del campo del modelo "Channel"
})

schema.virtual('requests', {
    ref: 'Request', // Modelo
    localField: '_id', // Mi campo que tiene la N
    foreignField: 'owner', // El nombre del campo del modelo "Channel"
})

schema.virtual('companyRequests', {
    ref: 'Request', // Modelo
    localField: '_id', // Mi campo que tiene la N
    foreignField: 'company', // El nombre del campo del modelo "Channel"
})
const User = mongoose.model('User', schema);
module.exports = User;