const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'rumit.tei68@gmail.com',
    pass: 'doOm6379_rooD'
  }
}))


const app = express()
const port = 5050

app.use(bodyParser.urlencoded({ extended: true }))

let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000')
    res.set('Access-Control-Allow-Headers', 'origin, content-type, accept')
  }
}

app.use(express.static('public', options))

// app.use(bodyParser.json())
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
//   res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//   next()
// })

app.post('/mail', function (req, res) {

  transporter.sendMail(req.body, (error, info) => {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    } else {
      console.log('Email sent: ' + info.response)
      // res.sendStatus(200)
      res.status(200).send('Data sent to email')
      console.log(req.body)
    }
  })
})

app.listen(port, () => {
  console.log(`SMTP server has been launch`)
})