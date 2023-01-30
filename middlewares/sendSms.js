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