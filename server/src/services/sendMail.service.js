import nodemailer from "nodemailer"
import configure from "../config/config.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: configure.GOOGLE_USER,
        clientId: configure.GOOGLE_CLIENT_ID,
        clientSecret: configure.GOOGLE_CLIENT_SECRET,
        refreshToken: configure.GOOGLE_REFRESH_TOKEN,
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log("Error connecting to email server: ", error)
    } else {
        console.log("Server is ready to take our messages: ", success)
    }
})

const sendMail = async ({ to, subject, html }) => {
    const infoMail = await transporter.sendMail({
        from: `"Outfiqe" <${configure.GOOGLE_USER}`,
        to,
        subject,
        html
    })

    return infoMail
}

export {sendMail, transporter}