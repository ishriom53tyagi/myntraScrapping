module.exports.startEmailCampaign = async function (req, res) {
  try {
    // SendGrid Email API
    const sgMail = require("@sendgrid/mail");
    const email = req.body.email;
    const sendGrid_API_Key = "";
    sgMail.setApiKey(sendGrid_API_Key);

    const msgHTML = `<tbody>
<tr>
  <td
    style="
      padding: 15px 0px;
      font-size: 15px;
      background-color: rgb(2, 124, 213);
      text-align: center;
      color: rgb(255, 255, 255);
    "
  >
    <img alt="" />
  </td>
</tr>
<tr>
  <td>
    <span>
      <div
        style="
          font-size: 10.5pt;
          border: 1px solid rgb(187, 187, 187);
          padding: 20px;
        "
      >
        <div>
          Hi User,
          <br />
          <br />We would like to let you know that your
          Myntra product price is below the range you have selected. You can have a look at the product if you want to purchase it.
          <br />
          <br />We continue to work with 
          your product when it reaches the selected range, we'll notified you again.
          <br />
          <br />We would like to thank you for your
          understanding.
          <br />
          <br />Thanks, <br />myntraScrapping
          <br />
        </div>
      </div>
    </span>
  </td>
</tr>
</tbody>`;

    const msg = {
      to: "adityasangwan310@gmail.com", // Change to your recipient
      from: {
        name: "myntraScrapping",
        email: "xxstyagixx@gmail.com",
      }, // Change to your verified sender
      subject: "Hurray! Product reaches your Selected Range",
      text: "Message",
      html: msgHTML,
    };

    sgMail
      .send(msg)
      .then((response) => console.log("Email Sent Successfully."))
      .catch((error) => console.log("Error " + error));
  } catch (error) {
    throw error;
  }
};
