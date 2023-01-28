// const axios = require("axios");

// const url = "https://api.mobitechtechnologies.com/sms/sendsms";
// const api_key =
//   "373a889e83bef0fda31e496b7ed5e4378e2de25fb6d2207c00a457774ff4876a";
// const sender_id = "23107";

// module.exports = async function sendSMS(phone, message) {
//   let details = {
//     api_key: api_key,
//     mobile_number: parseInt(phone),
//     message: message,
//     sender_id: 23107,
//     service_id: 0,
//   };
//   try {
//     const response = await axios.post(url, details);
//     console.log("request successful!");
//     console.log(response);
//   } catch (error) {
//     if (error.response) {
//       console.log(error.reponse.status);
//     } else {
//       console.log(error.message);
//     }
//   }
// };

const AfricasTalking = require('africastalking');

// Initialize Africa's Talking

const africastalking = AfricasTalking({
  apiKey: '54b161276d0a5c6bbfa13602443d06d7fa5e743926c73473678cd33ac752edb7', 
  username: 'mwanyika'
});


module.exports = async function sendSMS(phone,message) {  
    // Send message
    try {
        const result=await africastalking.SMS.send({
            to: '+254'+phone, 
            message: message,
            from: '23107'
        });
        console.log(result);
    } catch(ex) {
        console.error(ex);
    } 
};