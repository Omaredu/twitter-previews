const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
})
const app = express()
const upload = multer({ storage: storage })

const PORT = 3001

app.use(express.static('public'))
app.set('view engine', 'pug')

app.post('/certificate', upload.single('file'), (req, res) => {
    res.status(201).json({ file: req.file.filename })
})

app.get('/certificate', (req, res) => {
    res.render('certificate', { title: req.query.title, description: req.query.description, image: 'https://da6c17d4f457.ngrok.io/uploads/' + req.query.image })
})

app.listen(PORT, () => console.log(`app on port: ${PORT}`))