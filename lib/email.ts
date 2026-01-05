import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_PUBLIC_KEY!,
  apiSecret: process.env.MAILJET_API_PRIVATE_KEY!,
});

interface WaitlistData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export async function sendWaitlistConfirmationEmail(data: WaitlistData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #000000;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #000000; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 4px; overflow: hidden;">
              <tr>
                <td style="background-color: #0a0a0a; padding: 50px; text-align: center; border-bottom: 3px solid #D4AF37;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase;">EKOVIBE</h1>
                  <p style="color: #D4AF37; margin: 10px 0 0; font-size: 12px; letter-spacing: 3px; font-weight: 600;">DESTINATION & VIBES</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 45px; background-color: #ffffff;">
                  <h2 style="color: #0a0a0a; margin: 0 0 20px; font-size: 26px; font-weight: 700;">The Ecosystem is Loading, ${
                    data.firstName
                  }.</h2>

                  <p style="color: #333333; font-size: 16px; line-height: 1.8; margin: 0 0 25px;">
                    Thank you for joining the Ekovibe waitlist. You are now part of an exclusive community redefining the pinnacle of modern African living.
                  </p>

                  <p style="color: #0a0a0a; font-size: 16px; line-height: 1.6; margin: 0 0 15px; font-weight: 700;">Your Ekovibe Experience Includes:</p>

                  <ul style="color: #444444; font-size: 15px; line-height: 2; padding-left: 20px;">
                    <li><strong>Elite Access:</strong> Priority reservations at Lagos' top venues.</li>
                    <li><strong>Bespoke Concierge:</strong> White-glove logistics and travel planning.</li>
                    <li><strong>The Aesthetic:</strong> Early access to our "Vibe-Wear" capsule drops.</li>
                    <li><strong>The Vibe Report:</strong> Curated media showcasing hidden gems and elite nightlife.</li>
                  </ul>

                  <p style="color: #666666; font-size: 15px; line-height: 1.8; margin: 35px 0 0; font-style: italic;">
                    "Premium or Nothing. No Eko, No Vibes."
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background-color: #0a0a0a; padding: 40px; text-align: center;">
                  <p style="color: #ffffff; font-size: 14px; margin: 0 0 15px; letter-spacing: 1px;">
                    &copy; ${new Date().getFullYear()} ekovibe.com.ng
                  </p>
                  <p style="color: #888888; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
                    Lagos | London | Global
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

  const textContent = `
Welcome to Ekovibe, ${data.firstName}!

Thank you for joining the waitlist.

What to expect:
- Elite Access: Priority reservations at the city's top spots.
- Bespoke Concierge: Seamless travel and lifestyle management.
- The Aesthetic: Early drops for Ekovibe Shop "Vibe-Wear".
- The Vibe Report: Your pulse on modern African living.

Premium or Nothing. No Eko, No Vibes.

© ${new Date().getFullYear()} ekovibe.com.ng. All rights reserved.
  `;

  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL_ADDRESS!,
            Name: process.env.SENDER_EMAIL_NAME || "EKOVIBE",
          },
          To: [
            {
              Email: data.email,
              Name: `${data.firstName} ${data.lastName}`,
            },
          ],
          Subject: `Welcome to Ekovibe - You're on the List`,
          TextPart: textContent,
          HTMLPart: htmlContent,
        },
      ],
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send Ekovibe confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendAdminNotificationEmail(data: WaitlistData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
              <tr>
                <td style="background-color: #023020; padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Ekovibe Admin Alert</h1>
                  <p style="color: #D4AF37; margin: 5px 0 0; font-size: 12px;">New Ecosystem Signup Detected</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px;">

                  <h2 style="color: #0a0a0a; margin: 0 0 15px; font-size: 18px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">User Profile</h2>
                  
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="10">
                    <tr>
                      <td style="color: #888888; width: 120px; font-size: 14px;">Full Name:</td>
                      <td style="color: #0a0a0a; font-weight: 600;">${data.firstName} ${data.lastName}</td>
                    </tr>
                    <tr>
                      <td style="color: #888888; font-size: 14px;">Email:</td>
                      <td style="color: #023020; font-weight: 600;"><a href="mailto:${data.email}" style="color: #023020; text-decoration: none;">${data.email}</a></td>
                    </tr>
                    <tr>
                      <td style="color: #888888; font-size: 14px;">Phone:</td>
                      <td style="color: #0a0a0a; font-weight: 600;">${data.phoneNumber}</td>
                    </tr>
                  </table>

                  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center;">
                    <a href="https://ekovibe.com.ng/dashboard" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 600;">View in Admin Dashboard</a>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                  <p style="color: #999999; font-size: 11px; margin: 0;">
                    Automated notification from Ekovibe Infrastructure V1.0
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

  const textContent = `
NEW EKOVIBE SIGNUP ALERT
------------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phoneNumber}
Date: ${new Date().toLocaleString()}

View dashboard: https://ekovibe.com.ng/dashboard
  `;

  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL_ADDRESS!,
            Name: "EKOVIBE Engine",
          },
          To: [
            {
              Email: process.env.ADMIN_EMAIL_ADDRESS!,
              Name: "Ekovibe Admin Team",
            },
          ],
          Subject: `🚨 New Signup: ${data.firstName}`,
          TextPart: textContent,
          HTMLPart: htmlContent,
        },
      ],
    });
    return { success: true };
  } catch (error) {
    console.error("Admin notification failed:", error);
    return { success: false, error };
  }
}
