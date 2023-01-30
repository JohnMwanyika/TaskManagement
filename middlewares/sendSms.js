const axios = require("axios");

module.exports = async function axiosSendText(phone, message) {
  var data = JSON.stringify({
    response_type: "json",
    sender_name: "23107",
    service_id: 0,
    message: message,
    mobile: phone,
  });

  let config = {
    method: "post",
    url: "https://api.mobitechtechnologies.com/sms/sendsms",
    data: data,
    headers: {
      h_api_key:
        "373a889e83bef0fda31e496b7ed5e4378e2de25fb6d2207c00a457774ff4876a",
      "Content-Type": "application/json",
    },
  };

  await axios(config).then((res) => {
    console.log(JSON.stringify(res.data));
  }).catch((err)=>{
    console.log(err)
  })
};
// const request = require("ajax-request");

// const api_key =
//   "373a889e83bef0fda31e496b7ed5e4378e2de25fb6d2207c00a457774ff4876a";
// const sender_id = "23107";

// module.exports = async function axiosSendSMS(phone, message) {
//   let url = "https://api.mobitechtechnologies.com/sms/sendsms";

//   let details = {
//     mobile_number: "0" + phone,
//     response_type: "json",
//     message: message,
//     sender_name: 23107,
//     service_id: 0,
//   };

//   let headers = {
//     h_api_key:
//       "373a889e83bef0fda31e496b7ed5e4378e2de25fb6d2207c00a457774ff4876a",
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await axios.post(url, details, headers);
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

// const AfricasTalking = require("africastalking");

// // Initialize Africa's Talking

// const africastalking = AfricasTalking({
//   apiKey: "54b161276d0a5c6bbfa13602443d06d7fa5e743926c73473678cd33ac752edb7",
//   username: "mwanyika",
// });

// module.exports = async function sendSMS(phone, message) {
//   // Send message
//   try {
//     const result = await africastalking.SMS.send({
//       to: "+254" + phone,
//       message: message,
//       from: "23107",
//     });
//     console.log(result);
//   } catch (ex) {
//     console.error(ex);
//   }
// };
// #########AJAX SEND ###############
// module.exports = function ajaxSendText(phone, message) {
//   try {
//     const url = "http://bulksms.mobitechtechnologies.com/api/sendsms";

//     var details = {
//       mobile_number: "0" + phone,
//       response_type: "json",
//       message: message,
//       sender_name: "23107",
//       service_id: 0,
//     };
//     var data = JSON.stringify(details)

//     var headers = {
//       h_api_key:
//         "373a889e83bef0fda31e496b7ed5e4378e2de25fb6d2207c00a457774ff4876a",
//       "Content-Type": "application/json;charset=UTF-8",
//     //   "Access-Control-Allow-Origin": "*",
//     };

//     request.post(
//       {
//         url: url,
//         data: data,
//         headers: headers,
//       },
//       function (err, res, body) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(res);
//           console.log(body);
//         }
//       }
//     );
//   } catch (error) {}
// };
