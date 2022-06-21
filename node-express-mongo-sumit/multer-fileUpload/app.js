const express = require('express')
const multer = require('multer')

const app = express()
const upload = multer({
    dest: './uploads'
})

app.post('/admin', upload.single('avatar'),  (req, res) => {
    res.send('hello world')
})

app.listen('3000')