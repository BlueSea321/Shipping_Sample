const mongoose = require('mongoose')

const CourierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pricekm: {
        type: Number,
        required: true
    },
    pricekg: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Courier', CourierSchema)