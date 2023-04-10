import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    website_type: {
        type: String,
        trim: true,
        enum: ['website', 'ecommerce', 'app']
    },
    contact_information: {
        full_name: {
            type: String
        },
        email: {
            type: String
        }
    },
    budget: {
        from: {
            type: Number
        },
        to: {
            type: Number
        }
    },
    description: {
        type: String
    },
    state: {
        type: String,
        default: 'onhold',
        enum: ['onhold', 'inprogress', 'completed', 'cancelled']
    }
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

export default Project