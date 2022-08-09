// import * as nodemailer from 'nodemailer';
import nodemailer = require('nodemailer');

const email = {
  user: 'morenoluketi@gmail.com',
  password: 'suthpvpkabamdtxf'
}

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



// send mail with defined transport object
// let info = await transporter.sendMail({
//   from: '"Fred Foo 👻" <foo@example.com>', // sender address
//   to: "bar@example.com, baz@example.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// });

