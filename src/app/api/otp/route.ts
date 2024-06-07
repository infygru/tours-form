import { transporter } from "@/lib/nodemailer";
import { Otp_template } from "@/templete/otpTemplate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  let sendMessage = {
    from: "no-reply@gmail.com",
    to: email,
    subject: ` ${OTP}  is Your OTP for Authentication at MightyPlanet`,
    html: Otp_template(OTP),
  };

  await transporter.sendMail(sendMessage, function (err: any, info: any) {
    if (err) {
      console.log(err);
      return NextResponse.json({ message: "error" });
    } else {
      console.log("info ********", info);
    }
  });
  return NextResponse.json({ message: "success", otp: OTP });
}
