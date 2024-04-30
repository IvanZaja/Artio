const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoyBNDa5p75LeKVawcokEVRibDpDogr5lxkIbQG7vHg&s',
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
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

const Company = mongoose.model('Company', schema);
module.exports = Company;