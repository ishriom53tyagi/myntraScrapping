const email = require("../config.json");
const sendGrid_API_Key = email.sendGrid.sendGrid_API_Key;
const senderEmail = email.sendGrid.senderEmail;
module.exports.startEmailCampaign = async function (email) {
  try {
    const startingHTML = `<tbody>
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
                                    <br />Hi user, Welcome to Ginnie! 
                                    <br />
                                    <br />You have successfully registered with us. We are monitoring your product as soon as your product reaches the specified price limit we will notify you through registered email.
                                    <br />
                                    <br />Thank You for choosing Ginni. <br /><br />Have a great Day😊
                                    <br />
                                  </div>
                                </div>
                              </span>
                            </td>
                          </tr>
                          </tbody>`;

    const Subject = "Welcome to Ginnie!";

    // Calling SendGrid for email
    emailSender(email, Subject, startingHTML);

    console.log("Starting Email");
  } catch (error) {
    throw error;
  }
};

module.exports.matchEmailCampaign = async function (email) {
  try {
    const matchHTML = `<tbody>
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
                                  Myntra product price is below the price you have selected. You can have a look at the product if you want to purchase it.
                                  <br />
                                  <br />We continue to work with 
                                  your product when it reaches the specified price, we will notify you again.
                                  <br />
                                  <br />We would like to thank you for your
                                  understanding.
                                  <br />
                                  <br />Thanks, <br />Ginnie
                                  <br />
                                </div>
                              </div>
                            </span>
                          </td>
                        </tr>
                        </tbody>`;
    const Subject = "Hurray! Product price is in specified Limit";

    // Calling SendGrid for email
    emailSender(email, Subject, matchHTML);
    console.log("Match Email");
  } catch (error) {
    throw error;
  }
};

// SendGrid Function
const emailSender = function (email, Subject, HTML) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(sendGrid_API_Key);
  const msg = {
    to: email, // Change to your recipient
    from: {
      name: "Ginnie",
      email: senderEmail,
    }, // Change to your verified sender
    subject: Subject,
    text: "Message",
    html: HTML,
  };
  sgMail
    .send(msg)
    .then((response) => console.log("Email Sent Successfully."))
    .catch((error) => console.log("Error " + error));
};
