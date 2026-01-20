const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

class notification {
  constructor(transporter) {
    this.transporter = transporter;
  }

  async sendEmail(to, subject, templateName, variables = {}) {
    const templatePath = path.join(__dirname, "templates", templateName);
    const html = fs.readFileSync(templatePath, "utf8");
    for (const key in variables) {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      html = html.replace(pattern, variables[key]);
    }

    const mailOptions = {
      from: `"Manchester Cleaners" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Error while sending email", error.message);
    }
  }
}
module.exports =notification
