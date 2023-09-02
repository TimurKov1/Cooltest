const express = require('express')
const config = require('config')
const path = require('path')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/test', require('./routes/test.routes'))

if (process.env.NODE_ENV == 'production') {
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 3002

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
})