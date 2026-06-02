import { generateOTP } from "./generateOTP.js";

const otp = generateOTP()

export const sendMailHtml = `

<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title> Outfique Verification</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#0a0a0a;
  font-family:Inter,Arial,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 20px;">

<table width="620" cellpadding="0" cellspacing="0" style="
  background:#111111;
  border:1px solid #262626;
  border-radius:24px;
  overflow:hidden;
">

  <!-- Logo / Header -->

  <tr>
    <td align="center" style="padding:40px 30px 20px;">
      <h1 style="
        color:#ffffff;
        margin:0;
        font-size:34px;
        letter-spacing:1px;
        font-weight:800;
      ">
         Outfique
      </h1>

  <p style="
    color:#888888;
    margin-top:10px;
    font-size:15px;
  ">
    Secure Authentication
  </p>
</td>

  </tr>

  <!-- Divider -->

  <tr>
    <td>
      <div style="
        height:1px;
        background:#262626;
      "></div>
    </td>
  </tr>

  <!-- Content -->

  <tr>
    <td style="padding:40px;">

  <h2 style="
    color:#ffffff;
    margin-top:0;
    font-size:28px;
  ">
    Verify your identity
  </h2>

  <p style="
    color:#b3b3b3;
    line-height:1.8;
    font-size:15px;
  ">
    Use the verification code below to continue signing in to your
     Outfique account.
  </p>

  <!-- OTP -->
  <div style="
    text-align:center;
    margin:40px 0;
  ">
    <div style="
      display:inline-block;
      background:linear-gradient(
        135deg,
        #171717,
        #222222
      );
      border:1px solid #333333;
      padding:22px 36px;
      border-radius:18px;
      box-shadow:0 0 25px rgba(255,255,255,.05);
    ">
      <span style="
        color:#ffffff;
        font-size:42px;
        letter-spacing:12px;
        font-weight:800;
      ">
        ${otp}
      </span>
    </div>
  </div>

  <div style="
    background:#181818;
    border:1px solid #262626;
    border-radius:14px;
    padding:16px;
  ">
    <p style="
      margin:0;
      color:#d4d4d4;
      font-size:14px;
      line-height:1.7;
    ">
      ⏱ This code will expire in <strong>5 minutes</strong>.
    </p>
  </div>

  <p style="
    margin-top:30px;
    color:#808080;
    line-height:1.8;
    font-size:14px;
  ">
    If you didn't request this verification code, you can safely
    ignore this email. No changes will be made to your account.
  </p>

</td>

  </tr>

  <!-- Footer -->

  <tr>
    <td align="center" style="
      padding:30px;
      border-top:1px solid #262626;
    ">
      <p style="
        color:#666666;
        font-size:13px;
        margin:0;
      ">
        © ${new Date().getFullYear()} Outfique • Premium Fashion Marketplace
      </p>

  <p style="
    color:#4d4d4d;
    font-size:12px;
    margin-top:10px;
  ">
    Never share your OTP with anyone.
  </p>
</td>

  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
