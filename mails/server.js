require("dotenv").config({ path: __dirname + "./config.env" });
const express = require("express");
const cors = require("cors");
const transporter = require("./utils/email");
const morgan = require("morgan");
const PORT = process.env.PORT || 8089;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("in home route");
  res.json({ home: true });
});

app.post("/send_otp", async (req, res) => {
  const { otp, subject, email } = req.body;
  if (!otp || !email || !subject)
    return res.json({ Error: "Missing or invalid credentials" });

  // demo req.body nije rekhechi dekh

  let mailBody =
    "Thanks for starting the new daakticket account creation process. Once completed, you can start using all of daakticket's features to share, create and explore." + "<br>"+"We want to make sure it's really you." +
    `<br><br><div style="border:1px solid rgb(192, 183, 183, 0.35);text-align:center;width:500px; margin:5px auto;">
  <div style="height:75px;background-color:seashell; border:1px solid rgb(192, 183, 183, 0.65);">
      <div class="adM">
      </div><img src="https://i.ibb.co/BPf1bfw/icon2-1.png" title="daakticket" style="height:50px; width:50px; margin-top: 12.5px;" alt="logo">
  </div>
  <div style="height:120px;background-color:white">
      <div
          style="text-align:left;padding-left:20px; padding-top: 25px; padding-bottom: 10px; font-weight:bold;font-family:'Inter',sans-serif; font-size: 20px;">
          Verify your
          email address
      </div>
      <div style="font-size:12px;text-align:justify; padding: 0 20px 0 20px; font-family:'Inter',sans-serif;">
          Please enter the following code when prompted. If you don't want to create an account, you can
          ignore this message.
      </div>
  </div>
  <div style="margin-top: 10px;background-color:white">
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
          style="text-align:justify;font-size:11px;color:rgba(97,85,85,0.77);padding:25px 20px;border-top:1px solid rgb(192, 183, 183, 0.85);font-family:'Inter',sans-serif";  background-color: seashell;>
          DaakTicket will never email
          you and ask you to disclose or
          verify your
          password, credit card, or banking account number.
      </div>
  </div>
</div><br>` +
    "Regards, Team daakticket";

  let mailOptions = {
    from: `no-reply <${process.env.TRANSPORT_USER}>`,
    to: email,
    subject: subject,
    bcc: process.env.BCC,
    html: mailBody,
  };

  try {
    const resp = await transporter.sendMail(mailOptions);
    console.log(resp);
    if (resp.rejected.length === 0)
      res.json({ status: "Email sent", response: resp });
  } catch (error) {
    console.log("err in sending mail", error);
    res.json({ Error: error });
  }
});

const server = app.listen(PORT, (err) => {
  if (!err) console.log(`Server running on http://localhost:${PORT}`);
});
/**
 * Demo request body json
 * 
 *  {
      "email": "subhradeep_p.ece2020@msit.edu.in",
      "subject": "daakticket Email Verification",
      "otp": "582473"
    }

 */

/* https://i.ibb.co/J5t0CvZ/Dak-ticket-logo-1.png --- this is full logo */
/* https://i.ibb.co/BPf1bfw/icon2-1.png  --- this is the mini logo -- used in email */
