const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
    offerId: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true
    },
    couriername: {
        type: String,
        required: true
    },
    courierId: {
        type: String,
        required: true
    },
    materialType: {
        type: String,
        required: true
    },
    collectionAddress: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryType: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    cvc: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Offer', OfferSchema)