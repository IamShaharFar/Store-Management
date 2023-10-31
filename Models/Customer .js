const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true,
        unique: true, 
        match: [ // Ensure the email follows a typical email pattern
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Please provide a valid email'
        ]
    },
    contact_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now  
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
