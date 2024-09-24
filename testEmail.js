import transporter from './src/config/nodemailer.config.js';

async function testEmail() {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Remitente desde las variables de entorno
      to: 'elearningexperience013@gmail.com', // Cambia esto a tu correo de prueba
      subject: 'Test Email', // Asunto del correo
      text: 'This is a test email.', // Texto plano del correo
      html: '<b>This is a test email.</b>', // Contenido HTML del correo (opcional)
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Ejecuta la función de prueba
testEmail();
