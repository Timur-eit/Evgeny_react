const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'somerealemail@gmail.com',
    pass: 'realpasswordforaboveaccount'
  }
}))

const app = express()
const port = 5050

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/mail', function (req, res) {

  transporter.sendMail(req.body, (error, info) => {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    } else {
      console.log('Email sent: ' + info.response)
      res.sendStatus(200)
    }
  })
})

app.listen(port, () => {
  console.log(`SMTP server has been launch`)
})