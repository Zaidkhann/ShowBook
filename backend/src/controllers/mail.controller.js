import transporter from "../config/mail.js"

export const sendBookingMail = async (req, res) => {
  try {
    const {
      email,
      userName,
      movieName,
      theaterName,
      theaterLocation,
      showTime,
      seats,
    
    } = req.body;

    const mailOptions = {
      from: `"ShowBook" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "🎬 ShowBook - Booking Confirmed",
      html: `
        
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed - ShowBook</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#08090c;
  font-family:Arial,Helvetica,sans-serif;
  color:#ffffff;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:#08090c;padding:40px 15px;">

    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="
            max-width:600px;
            width:100%;
            background:#111318;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #252830;
          ">

          <!-- Header -->
          <tr>
            <td style="
              padding:28px 30px;
              background:linear-gradient(135deg,#16181e,#0d0e12);
              border-bottom:1px solid #292c34;
            ">

              <table width="100%">
                <tr>
                  <td>
                    <div style="
                      font-size:26px;
                      font-weight:800;
                      letter-spacing:-1px;
                    ">
                      🎬 <span style="color:#ff3b6b;">Show</span>Book
                    </div>
                  </td>

                  <td align="right">
                    <span style="
                      background:#173d2b;
                      color:#4ade80;
                      padding:8px 12px;
                      border-radius:20px;
                      font-size:12px;
                      font-weight:bold;
                    ">
                      ✓ CONFIRMED
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>


          <!-- Success -->
          <tr>
            <td align="center" style="padding:35px 25px 20px;">

              <div style="
                width:64px;
                height:64px;
                line-height:64px;
                border-radius:50%;
                background:#183d2a;
                color:#4ade80;
                font-size:30px;
                margin:auto;
              ">
                ✓
              </div>

              <h1 style="
                margin:18px 0 8px;
                font-size:26px;
                color:#ffffff;
              ">
                Booking Confirmed!
              </h1>

              <p style="
                margin:0;
                color:#9ca3af;
                font-size:14px;
              ">
                Your movie tickets are ready 🎉
              </p>

            </td>
          </tr>


          <!-- Greeting -->
          <tr>
            <td style="padding:10px 30px 25px;">

              <p style="
                margin:0;
                font-size:16px;
                color:#e5e7eb;
              ">
                Hello <strong>${userName}</strong> 👋
              </p>

              <p style="
                margin:10px 0 0;
                font-size:14px;
                line-height:1.6;
                color:#9ca3af;
              ">
                Your booking has been successfully confirmed.
                Here are your movie details:
              </p>

            </td>
          </tr>


          <!-- Movie -->
          <tr>
            <td style="padding:0 30px 25px;">

              <table width="100%" cellpadding="0" cellspacing="0"
                style="
                  background:#191b21;
                  border-radius:14px;
                  border:1px solid #292c34;
                ">

                <tr>
                  <td style="padding:22px;">

                    <p style="
                      margin:0 0 7px;
                      color:#8b92a1;
                      font-size:11px;
                      text-transform:uppercase;
                      letter-spacing:1px;
                    ">
                      MOVIE
                    </p>

                    <h2 style="
                      margin:0;
                      font-size:22px;
                      color:#ffffff;
                    ">
                      ${movieName}
                    </h2>

                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- Booking Details -->
          <tr>
            <td style="padding:0 30px 25px;">

              <p style="
                margin:0 0 14px;
                font-size:13px;
                font-weight:bold;
                color:#ffffff;
                text-transform:uppercase;
                letter-spacing:1px;
              ">
                Booking Details
              </p>

              <table width="100%" cellpadding="0" cellspacing="0"
                style="
                  background:#191b21;
                  border-radius:14px;
                  border:1px solid #292c34;
                ">

                <tr>
                  <td style="padding:18px 20px;border-bottom:1px solid #292c34;">
                    <span style="color:#8b92a1;font-size:12px;">
                      THEATRE
                    </span>
                    <br>
                    <strong style="font-size:15px;color:#ffffff;">
                      ${theaterName}
                    </strong>
                  </td>

                  <td style="padding:18px 20px;border-bottom:1px solid #292c34;">
                    <span style="color:#8b92a1;font-size:12px;">
                      LOCATION
                    </span>
                    <br>
                    <strong style="font-size:15px;color:#ffffff;">
                      ${theaterLocation}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 20px;">
                    <span style="color:#8b92a1;font-size:12px;">
                      SHOW TIME
                    </span>
                    <br>
                    <strong style="font-size:15px;color:#ffffff;">
                      ${showTime}
                    </strong>
                  </td>

                  <td style="padding:18px 20px;">
                    <span style="color:#8b92a1;font-size:12px;">
                      SEATS No:
                    </span>
                    <br>
                    <strong style="font-size:15px;color:#ff3b6b;">
                      ${seats}
                    </strong>
                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- Ticket Section -->
          <tr>
            <td style="padding:0 30px 30px;">

              <table width="100%" cellpadding="0" cellspacing="0"
                style="
                  background:linear-gradient(135deg,#ff3b6b,#e11d48);
                  border-radius:14px;
                ">

                <tr>
                  <td style="padding:22px;">

                    <p style="
                      margin:0;
                      color:#ffe4eb;
                      font-size:11px;
                      text-transform:uppercase;
                      letter-spacing:1px;
                    ">
                      YOUR TICKETS
                    </p>

                    <h2 style="
                      margin:7px 0 0;
                      font-size:24px;
                      color:#ffffff;
                    ">
                      🎟️ ${seats}
                    </h2>

                    <p style="
                      margin:8px 0 0;
                      color:#ffe4eb;
                      font-size:13px;
                    ">
                      Keep this email handy for your booking details.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- Divider -->
          <tr>
            <td style="padding:0 30px;">

              <div style="
                border-top:1px dashed #363942;
              "></div>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 30px 35px;">

              <p style="
                margin:0;
                font-size:15px;
                color:#e5e7eb;
                font-weight:bold;
              ">
                Enjoy the movie! 🍿
              </p>

              <p style="
                margin:8px 0 0;
                font-size:13px;
                color:#717784;
                line-height:1.5;
              ">
                Thank you for booking with ShowBook.
              </p>

              <p style="
                margin:18px 0 0;
                font-size:11px;
                color:#555b66;
              ">
                This is an automated booking confirmation.
                Please do not reply to this email.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Booking email sent successfully",
    });
  } catch (error) {
    console.error("MAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};