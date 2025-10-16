import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sendMail = async (Options) => {
  // Basic input validation to avoid silent failures
  if (!Options || !Options.email || !Options.subject || !Options.mailContent) {
    throw new Error("sendMail: missing required fields (email, subject, mailContent).");
  }

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "MY APP! CHANDU",
      // Add a proper scheme so many clients render links correctly
      link: "https://example.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(Options.mailContent);
  const emailHTML = mailGenerator.generate(Options.mailContent);

  const host = process.env.MAILTRAP_SMT_HOST;
  const port = Number(process.env.MAILTRAP_SMT_PORT) || 2525;
  const user = process.env.MAILTRAP_SMT_USER;
  const pass = process.env.MAILTRAP_SMT_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP env not set: MAILTRAP_SMT_HOST/MAILTRAP_SMT_USER/MAILTRAP_SMT_PASS");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    // secure: port === 465, // true for 465, false for 2525/587
    auth: { user, pass },
  });

  const mail = {
    from: process.env.MAIL_FROM || "test@example.com",
    to: Options.email,
    subject: Options.subject,
    text: emailTextual,
    html: emailHTML,
  };

  try {
    // Optional but helpful: verifies connection/auth before sending
    await transporter.verify();
    const info = await transporter.sendMail(mail);
    return info; // expose info to caller for debugging or logging
  } catch (error) {
    console.error("Failed to send email:", {
      message: error?.message,
      code: error?.code,
      response: error?.response,
      responseCode: error?.responseCode,
    });
    throw error;
  }
};

const emailVerificationMail = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "WELCOME to my App!! this is an email verification process",
      action: {
        instruction: "TO verify email click on button",
        button: {
          color: "#15884fff",
          text: "Confirm Your Account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMail = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We received a request to change your password.",
      action: {
        instruction: "To reset your password click the button",
        button: {
          color: "#92d046ff",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { forgotPasswordMail, emailVerificationMail, sendMail };