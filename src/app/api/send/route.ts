import { transporter } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.json();

  let sendMessage = {
    from: "no-reply@gmail.com",
    to: "gokulakrishnanr812@gmail.com",
    subject: `Got a new Form Submission from ${formData.name}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333;">
        <h1 style="background-color: #0073e6; color: white; padding: 10px;">New Form Submission</h1>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <th style="background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd;">Field</th>
            <th style="background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd;">Details</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              formData.name
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              formData.email
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              formData.phone
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Package</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              formData.package
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Date</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              formData.date
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Address</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              formData.address
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Created At</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        <div style="text-align: center; margin: 20px 0;">
          <a href="mailto:${
            formData.email
          }" style="background-color: #0073e6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Email</a>
        </div>
        <footer style="background-color: #0073e6; color: white; padding: 10px; text-align: center;">
          <p>Thank you for your submission!</p>
        </footer>
      </div>
    `,
  };

  transporter.sendMail(sendMessage, function (err: any, info: any) {
    console.log("err ********", err);
    console.log("info ********", info);
    if (err) {
      console.log(err);
    } else {
      console.log("info ********", info);
    }
  });
  return NextResponse.json({ message: "success" });
}
