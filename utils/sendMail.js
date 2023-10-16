import nodemailer from "nodemailer";
import logger from "../config/logger.js";
import dotenv from "dotenv";
import ejs from "ejs";
import juice from "juice";
import fs from "fs";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c745e632f73896",
    pass: "52bf3b025bdb33",
  },
});

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendMail = async ({
  template,
  templateVars,
  to,
  subject,
  callback = null,
}) => {
  // const accessTokenObject = await oAuth2Client.getAccessToken();
  // const access_token = accessTokenObject?.token;

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.ADMIN_EMAIL,
  //     clientId: process.env.CLIENT_ID,
  //     clientSecret: process.env.CLIENT_SECRET,
  //     refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
  //     accessToken: access_token,
  //   },
  // });

  const templatePath = `templates/${template}.html`; // đường dẫn tới template
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
  };

  if (template && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, "utf-8");
    const html = ejs.render(template, templateVars);
    // templateVars là các biến được truyền vào template thông qua hàm render
    // const text = convert(html);
    const htmlWithStylesInlined = juice(html);

    mailOptions.html = htmlWithStylesInlined;
    //options.text = text;
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
      if (callback) {
        callback();
      }
    }
  });
};

export default sendMail;
