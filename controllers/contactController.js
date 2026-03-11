// controllers/contactController.js
// ✅ RESEND VERSION (WORKS PERFECTLY ON RENDER)

import { Resend } from "resend";
import Contact from "../models/contact.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (req, res) => {

    // ================= DEBUG =================
    console.log("📥 RAW BODY RECEIVED:", req.body);
    console.log("📥 KEYS RECEIVED:", Object.keys(req.body));
    console.log("📥 VALUES:", {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });

    const { name, email, phone, message } = req.body;

    // ================= VALIDATION =================
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
        console.log("❌ VALIDATION FAILED - Missing fields");

        return res.status(400).json({
            success: false,
            message: "Name, email, phone and message are required",
            received: req.body
        });
    }

    try {

        // ================= SAVE TO DATABASE =================
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        // ================= SEND EMAIL =================
        await resend.emails.send({
            from: "Samsee Tech <onboarding@resend.dev>",
            to: process.env.EMAIL_USER,
            subject: `New Contact Form from ${name}`,
            reply_to: email,
            html: `
                <h3>New Contact Form Submission</h3>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>

                <hr>

                <small>Saved in MongoDB at ${new Date().toLocaleString()}</small>
            `
        });

        console.log("✅ SUCCESS - Email sent & saved");

        res.status(200).json({
            success: true,
            message: "✅ Message sent successfully!"
        });

    } catch (error) {

        console.error("❌ SERVER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
};