import nodemailer from "nodemailer";

export const sendContactEmail = async ({ name, email, phone, message }) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Contact Message - Samsee Tech",
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
`,
  };

  await transporter.sendMail(mailOptions);
};

  // Auto reply to client
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting Samsee Tech",
    html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for contacting Samsee Tech Solution.</p>
      <p>Our team will review your message and get back to you shortly.</p>
      <br/>
      <p>Best Regards</p>
      <p>Samsee Tech Solution</p>
    `,
  });

