const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eggiyapari19@gmail.com',
        pass: 'yhmpkshxyfsilwua'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter
