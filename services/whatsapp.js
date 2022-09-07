module.exports.startWhatsappCampagin = async function (req, res) {
  try {
    // WhatsApp API call
    require("dotenv").config();

    const client = require("twilio")(accountSid, authToken);

    const msgWhatsApp =
      "Hello there!, We would like to let you know that your Myntra product price is below the range you have selected. You can have a look at the product if you want to purchase it.";
    client.messages
      .create({
        body: msgWhatsApp,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+917669910064",
      })
      .then((message) => console.log(message.sid));
  } catch (error) {
    throw error;
  }
};
