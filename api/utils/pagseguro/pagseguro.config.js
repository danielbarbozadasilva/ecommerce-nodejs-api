module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  sandbox: process.env.NODE_ENV !== 'production',
  sandbox_email:
    process.env.NODE_ENV === 'production' ? null : process.env.SANDBOX_EMAIL,
  email: process.env.EMAIL,
  token: process.env.TOKEN,
  notificationURL: process.env.NOTIFICATION_URL
}
