function sendSMS(phone, content) {
  console.log('...SMS SENT');
  console.log('To:', phone);
  console.log('Message', content);
  return true;
}

module.exports = { sendSMS };
