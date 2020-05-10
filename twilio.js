let TWILIO_ACCOUNT_SID = "TWILIO_ACCOUNT_SID";
let TWILIO_AUTH_TOKEN = "TWILIO_AUTH_TOKEN";
let TWILIO_PHONE_NUMBER= +TWILIO_PHONE_NUMBER;

const sendSms =    (phone, message) => {
  var client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
   console.log("sendSMS");
   client.messages
    .create({
       body: message,
       from: TWILIO_PHONE_NUMBER,
       to: +anynumber
     })
    .then(message => console.log(message.body));
}

module.exports = sendSms;
