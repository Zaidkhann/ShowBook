export const sendBookingEmail = async ({
          email,
          userName,
          movieName,
          theaterName,
          theaterLocation,
          showTime,
          seats,}) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/mail/booking-confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          userName,
          movieName,
          theaterName,
          theaterLocation,
          showTime,
          seats,
          
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Email sending failed");
    }

    console.log("✅ Booking email sent:", data);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};