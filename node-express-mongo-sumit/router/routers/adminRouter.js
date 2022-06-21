const express = require('express')
const adminRouter = express.Router();


adminRouter.get('/dashboard', (req, res) => {
    res.send('dashboard')
})

adminRouter.get('/login', (req, res) => {
    res.send('login')
})



module.exports = adminRouter;