const User = require('../models/User')
require("dotenv").config({ path: "./config.env" });

const admin = new User({
    firstName: 'admin',
    lastName: 'admin',
    email: process.env.ADMIN_MAIL,
    role: 'admin',
    password: process.env.ADMIN_PASS
})

const seedAdmin = async () => {
    try {
        const existData = await User.findOne({ role: 'admin' })

        if (!existData) {
            await admin.save()
        } else {
            console.log('Admin already exist')
        }
    } catch(err) {
        console.error(err)
    }
}

module.exports = {
    seedAdmin
}