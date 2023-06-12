const jwt = require('jsonwebtoken')
require('dotenv').config({ path: "./config.env" })

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decoded) {
            req.user = decoded
            return next()
        } else {
            return res.send("Not allowed")
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
}

module.exports = auth