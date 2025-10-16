import dotenv from "dotenv";
dotenv.config();

import { sendMail, emailVerificationMail, forgotPasswordMail } from "./mail.js"; // adjust path if your file is named differently

async function main() {
  const to = process.env.TO_EMAIL || "test@example.com";

  console.log("Sending verification email...");
  await sendMail({
    email: to,
    subject: "Verify your account",
    mailContent: emailVerificationMail("Chandu", "https://example.com/verify?token=abc123")
  });

//   console.log("Sending forgot password email...");
//   await sendMail({
//     email: to,
//     subject: "Reset your password",
//     mailContent: forgotPasswordMail("Chandu", "https://example.com/reset?token=xyz789")
//   });

  console.log(to ,"Done. Check your Mailtrap inbox.");
}

main().catch((e) => {
  console.error("Unexpected error in test harness:", e);
});