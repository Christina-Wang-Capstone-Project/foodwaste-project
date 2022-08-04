require('dotenv').config()
const e = require("express");
const express = require("express")
const router = express.Router()
const Parse = require('parse/node');
const { __RouterContext } = require("react-router");
("use strict")


router.post('/', (req, res) => {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'wchristina4@gmail.com', // Change to your recipient
      from: 'christinawang@fb.com', // Change to your verified sender
      subject: 'Product Pick Up Alert',
      text: 'Testing if will send to product ',
      html: 'send to product',
    }
    sgMail
      .send(msg)
      .then(() => {
          console.log('Email sent', msg)
          res.status(200).send({})
      })
      .catch((error) => {
        console.error(error)
      })
})

  module.exports = router