export const MAILER_TRANSPORT = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tnb@thenationalbuilders.com', 
        pass: 'fswhdtiyzibtunzn', 
    },
};

export const MAILER_OPTIONS = {
    from: '"TNB Customer Service" <no-reply@thenationalbuilders.com>', 
    subject: 'Your Verification Code',
};