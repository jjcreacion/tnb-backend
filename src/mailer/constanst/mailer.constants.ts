export const MAILER_TRANSPORT = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'jjcreacion@gmail.com',
        pass: 'weffeojosbtsgsey', // Contraseña de aplicación
    },
};

export const MAILER_OPTIONS = {
    from: '"Verificación" <jjcreacion@gmail.com>',
    subject: 'Tu Código de Verificación',
};