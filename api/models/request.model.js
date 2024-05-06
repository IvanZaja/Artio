const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            default:"Sent"
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        company: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: 'Project'
        }

    },
    { timestamps: true }
)

    schema.pre('save', function(next) {
        const company = User.findById(this.company);
    
        if (company.role !== 'company') {
            throw new Error('Company field must be filled with a company');
        }
    
        next();
    });

const Request = mongoose.model('Request', schema);
module.exports = Request;
