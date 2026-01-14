import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendResetEmail(to: string, token: string) {
  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await mailer.sendMail({
    from: `"College Anonymous" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <p>Click below to reset your password</p>
      <a href="${link}">${link}</a>
    `,
  });
}
