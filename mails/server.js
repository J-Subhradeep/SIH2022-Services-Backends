require("dotenv").config({ path: __dirname + "./config.env" });
const express = require("express");
const cors = require("cors");
const transporter = require("./utils/email");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("in home route");
  res.json({ home: true });
});

app.post("/", (req, res) => {
  const { input } = req.body;
  console.log("in home route", input);
  res.json({ found: true, input: input });
});

app.post("/send", async (req, res) => {
  console.log("in email");
  const { input } = req.body;
  const { message, email } = input;
  const { otp, subject } = message;
  if (!otp || !email || !subject)
    return res.json({ Error: "Missing or invalid credentials" });

  let mailBody =
    `<div style="border:1px solid rgb(192, 183, 183, 0.35);text-align:center;width:500px; margin:5px auto; background-color: seashell;">
  <div style="height:75px;background-color:rgb(39,41,68)">
      <div class="adM">
      </div><img src="https://i.ibb.co/KDc3tKQ/Screenshot-121-removebg-preview.png" style="height:75px; width:120px" alt="logo">
  </div>
  <div style="height:120px;background-color:seashell">
      <div
          style="text-align:left;padding-left:20px; padding-top: 25px; padding-bottom: 10px; font-weight:bold;font-family:'Inter',sans-serif; font-size: 20px;">
          Verify your
          email address
      </div>
      <div style="font-size:12px;text-align:justify; padding: 0 20px 0 20px; font-family:'Inter',sans-serif;">
          Thanks for starting the new DaakTicket account creation process. We want to make sure it's really
          you. Please enter the following code when prompted. If you don't want to create an account, you can
          ignore this message.
      </div>
  </div>
  <div style="margin-top: 10px;background-color:seashell">
      <div style="font-size:13px;font-family:'Inter',sans-serif; font-weight: 700; ">Verification code
      </div>
      <div style="font-weight:700;font-size:35px; padding-top: -2px; font-family:'Inter',sans-serif">${otp}</div>
      <div
          style="font-weight:400;font-size: 12px; font-family:'Inter',sans-serif; padding-top: 3px; padding-bottom: 20px;">
          (This code is valid
          for 2 minutes)
      </div>
  </div>
  <div>
      <div
          style="text-align:justify;font-size:11px;color:rgba(97,85,85,0.77);padding:25px 20px;border-top:1px solid rgb(192, 183, 183, 0.85);font-family:'Inter',sans-serif">
          DaakTicket will never email
          you and ask you to disclose or
          verify your
          password, credit card, or banking account number.
      </div>
  </div>
</div><br>` + "Regards, Team DakTicket";

  // let mailBody = `<div style="background-color: red"
  //   <h2>${message.heading}</h2>
  //   <p>${message.body}</p></div>`;

  let mailOptions = {
    from: `no-reply@DAKTICKET <${process.env.TRANSPORT_USER}>`,
    to: email,
    subject: subject,
    bcc: process.env.BCC,
    html: mailBody,
    replyTo: `DAKTICKET <${process.env.TRANSPORT_USER}>`,
  };

  try {
    const resp = await transporter.sendMail(mailOptions);
    console.log(resp);
    if (resp.rejected.length === 0) res.send("Email sent");
  } catch (error) {
    console.log("err in sending mail", error);
    res.json({ Error: error });
  }
});

const server = app.listen(PORT, (err) => {
  if (!err) console.log(`Server running on http://localhost:${PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  server.close(() => process.exit(0));
});

/**
 * Demo request body json
 * {
        "input" = {
          email: "koushik_n.ece2020@msit.edu.in",
          message: {
            otp: "567894", // otp string"
            subject: "DAKTICKET Email Verification",
        },
    }
 */
