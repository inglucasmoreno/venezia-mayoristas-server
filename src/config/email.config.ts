// import * as nodemailer from 'nodemailer';
import nodemailer = require('nodemailer');

const email = {
  user: 'panaderiaveneziasl@gmail.com',
  password: 'xtailmcxquwbuxdf' 
}

console.log(email);

 // create reusable transporter object using the default SMTP transport
 export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email.user,       // generated ethereal user
    pass: email.password,   // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('Listo para enviar correos!');
});
