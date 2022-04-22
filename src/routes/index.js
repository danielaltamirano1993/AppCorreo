const { Router } = require("express");
const router = Router();

const nodemailer = require("nodemailer");

router.post("/sendEmail", async (req, res) => {
  console.log(req.body);
  res.send("received");
  const { name, email, phone, message } = req.body;

  contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

  //
  let transporter = nodemailer.createTransport({
    host: "mail.danychet.io",
    // SMTP --> 465 SSL and 25/587 port for TLS
    port: 465,
    secure: false,
    auth: {
      user: "test3@danychet.io",
      pass: "passwordtest",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: '"Danychet Server" <test3@danychet.xyz>', // sender address,
    to: "danychet.dz@gmail.com",
    subject: "Website Contact Form",
    // text: 'Hello World'
    html: contentHTML,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.redirect("/success.html");
});

module.exports = router;
