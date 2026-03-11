// controllers/contactController.js
// ✅ FULLY FIXED + DEBUG VERSION (Replace this file completely)

import nodemailer from 'nodemailer';
import Contact from '../models/contact.js';

export const sendContactEmail = async (req, res) => {
    // ==================== DEBUG - SEE EXACTLY WHAT REACT IS SENDING ====================
    console.log('📥 RAW BODY RECEIVED:', req.body);
    console.log('📥 KEYS RECEIVED:', Object.keys(req.body));
    console.log('📥 VALUES:', {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });

    const { name, email, phone, message } = req.body;

    // Validation (exact match to your Contact.jsx)
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
        console.log('❌ VALIDATION FAILED - Missing/empty fields');
        return res.status(400).json({ 
            success: false, 
            message: 'Name, email, phone and message are required',
            received: req.body
        });
    }

    try {
        // Save to MongoDB
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Form from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone No:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <small>Saved in MongoDB at ${new Date().toLocaleString()}</small>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log('✅ SUCCESS - Email sent & saved');
        res.status(200).json({ 
            success: true, 
            message: '✅ Message sent & saved successfully!' 
        });

    } catch (error) {
        console.error('❌ SERVER ERROR:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Check .env' 
        });
    }
};