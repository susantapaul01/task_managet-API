import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER } from "../config/config.js";

export const EmailSend = async (emailTo, emailSubject, emailText) => {

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURITY,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    
    let info = {
            from: `<${EMAIL_USER}>`,
            to: emailTo,
            subject: emailSubject,
            text: emailText
        }
        
    return await transporter.sendMail(info);
}