const express = require('express')
const router = express.Router()
const Offer = require('../models/Offer')

router.get('/getAllOffers', async (req, res) => {
    const offers = await Offer.find()
    res.json({
        data: offers
    })
})

router.get('/getOffersById/:id', async (req, res) => {
    const { id } = req.params
    const offers = await Offer.find({ courierId: id })
    const normalOffers = offers.filter(offer => offer.deliveryType === 'normal')
    const expressOffers = offers.filter(offer => offer.deliveryType === 'express')
    res.json({
        data: offers,
        normal: normalOffers,
        express: expressOffers
    })
})

router.get('/deleteOffer/:id', async (req, res) => {
    const { id } = req.params
    await Offer.deleteOne({ _id: id })
    const offers = await Offer.find()
    res.json({
        data: offers
    })
})

router.post('/createOffer', async (req, res) => {
    const {
        couriername,
        username,
        courierId,
        materialType,
        collectionAddress,
        deliveryAddress,
        deliveryType,
        distance,
        weight,
        totalPrice,
        cvc,
        expiry,
        number
    } = req.body

    let currentIndex;

    const currentOffers = await Offer.find()

    if (currentOffers.length > 0) {
        currentIndex = (await Offer.find({}).sort({ 'offerId': -1 }))[0].offerId
    } else {
        currentIndex = 0
    }

    const offer = new Offer({
        offerId: currentIndex + 1,
        username: username,
        couriername: couriername,
        courierId: courierId,
        materialType: materialType,
        collectionAddress: collectionAddress,
        deliveryAddress: deliveryAddress,
        deliveryType: deliveryType,
        distance: distance,
        weight: weight,
        totalPrice: totalPrice,
        cvc: cvc,
        expiry: expiry,
        number: number
    })
    await offer.save()
    res.json({
        status: 'success'
    })
})

module.exports = router