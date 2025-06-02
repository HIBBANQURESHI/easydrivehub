import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sofiajohnson1979@gmail.com',
      pass: 'tgbj qkpy mxpw fcln'
    }
  });

  const mailOptions = {
    from: 'sofiajohnson1979@gmail.com',
    to: 'sofiajohnson1979@gmail.com',
    subject: body.subject || 'New Contact Form Submission',
    html: `
      <h3>New ${body.formType} Submission</h3>
      ${Object.entries(body.data).map(([key, value]) => `
        <p><strong>${key}:</strong> ${value}</p>
      `).join('')}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}