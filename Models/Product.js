const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_description: String,
    stock_quantity: {
        type: Number,
        default: 0
    },
    price: Number,
    barcode: String,
    image_url: String,
    date_added: {
        type: Date,
        default: Date.now
    },
    categories: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);
