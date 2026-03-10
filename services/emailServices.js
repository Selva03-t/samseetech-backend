import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (data) => {

  const { name, email, phone, message } = data;

  // Email to you (admin notification)
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Contact Message - Samsee Tech",
    html: `
      <h3>New Client Inquiry</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  });

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

};