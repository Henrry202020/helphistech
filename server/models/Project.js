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
    company_info: {
        full_name: String,
        business_type: String,
        company_vision: String,
        target_audience: String,
        service_or_product: String,
        expected_deilvertime: { 
            from: Number, to: Number 
        },
    },
    project_info: {
        functionalities: [String],
        functionalities_other: String,
        web_design_type: String,
        ecommerce_funtionabilites: Boolean,
        content_to_include: Boolean,
        preferred_technologies: String,
        responsible_for_managing: String,
        marketing_strategy: String,
        competitor_websites: Boolean,
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