import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send contact form email (admin + auto reply)
 * @param {string} name
 * @param {string} email
 * @param {string} service
 * @param {string} message
 */
const sendContactEmail = async (name, email, service, message) => {
  try {
    // 1️⃣ Send email to admin (you)
    const adminMail = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📩 New ${service} inquiry from ${name}`,
      text: `
New Inquiry Received:

Name: ${name}
Email: ${email}
Service: ${service}

Message:
${message}
      `,
    };

    await transporter.sendMail(adminMail);

    // 2️⃣ Auto-reply to user
    const replyMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for contacting Josh Creations`,
      text: `Hello ${name},

Thank you for reaching out to Josh Creations!
We’ve received your message regarding "${service}" and our team will get back to you shortly.

Best Regards,  
Josh Creations  
📞 +91 6362168196  
📧 ${process.env.EMAIL_USER}
      `,
    };

    await transporter.sendMail(replyMail);
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
};

export default sendContactEmail;
