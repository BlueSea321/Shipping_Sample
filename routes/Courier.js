const express = require('express')
const router = express.Router()
const Courier = require('../models/Courier')

router.get('/getAllCouriers', async (req, res) => {
    const couriers = await Courier.find()
    res.json({
        data: couriers
    })
})

router.get('/getCourierById/:id', async (req, res) => {
    const { id } = req.params
    const courier = await Courier.findById(id)
    res.json({
        data: courier
    })
})

router.get('/del', async (req, res) => {
    await Courier.deleteMany()
})

router.get('/deleteCourier/:id', async (req, res) => {
    const { id } = req.params
    await Courier.deleteOne({ _id: id })
    const courierData = await Courier.find()
    res.json({
        data: courierData
    })
})

router.post('/addCourier', async (req, res) => {
    const {
        name,
        pricekm,
        pricekg
    } = req.body

    const courier = new Courier({
        name: name,
        pricekm: pricekm,
        pricekg: pricekg
    })

    await courier.save()

    const courierData = await Courier.find()

    res.json({
        data: courierData
    })
})

router.post('/editCourier', async (req, res) => {
    const {
        name,
        pricekm,
        pricekg,
        _id
    } = req.body

    const courier = await Courier.findById(_id)

    courier.name = name
    courier.pricekm = pricekm
    courier.pricekg = pricekg

    await courier.save()

    const courierData = await Courier.find()

    res.json({
        data: courierData
    })
})

module.exports = router