const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv"); //importing to access the environment variables
const bodyParser = require("body-parser"); // importing body parser middleware to parse form content from HTML
const nodemailer = require("nodemailer"); //importing node mailer
const PORT = process.env.PORT || 4050;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(), cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/sendemail", (req, res, next) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Contact name: ${req.body.name}-${req.body.subject}`,
    html: `<h1>Form Response</h1>
    <h5> Name:   ${req.body.name} </h5>
    <h5> Email:   ${req.body.email} </h5>
    <h5> Subject:   ${req.body.subject}</h5>
    <h5> Message:    </h5><p>${req.body.message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.statuus(401).send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Sent Successfully");
    }
  });
});
app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));
