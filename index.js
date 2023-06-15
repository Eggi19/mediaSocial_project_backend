const express = require('express')
const PORT = 5000
const app = express()
var cors = require('cors')

app.use(express.json())
app.use(express.static('Public'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1> WELCOME</h1>')
})

//import Routes
const { userRouter } = require('./Routers')
app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
