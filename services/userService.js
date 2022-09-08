const { spawn } = require("child_process");
const getDb = require("../utils/database").getDb;
const path = require("path");
const email = require("../services/email");

module.exports.saveUserWish = async function (req, res) {
  let dataToSend ='{"test":"abcd"}';
  const db = getDb();
  // spawn new child process to call the python script

  let urlToPass = req.body.url;
  const python = spawn("python3", [
    path.join(__dirname, "../workingFile.py"),
    urlToPass,
  ]);
  // collect data from script
  python.stdout.on("data", async function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("exit", async (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    try {
      if (dataToSend) {
        dataToSend = dataToSend.replace(/'/g, '"');
        dataToSend = JSON.parse(dataToSend);
      }
    } catch (error) {
      console.log(error);
      dataToSend = { success: false };
    }
    console.log(dataToSend);
    //Structure
    const db_update = {
      URL: urlToPass ? urlToPass : "",
      email: req.body.email ? req.body.email : "",
      discountedPrice: dataToSend?.price,
      totalPrice: dataToSend?.mrp,
      userWantPriceRange: Number(req.body.userRange),
      status: 1,
    };

    let _ = await db.collection("user").insertOne(db_update);

    await email.startEmailCampaign(req.body.email);
    return res.send(dataToSend);
  });

  /// Submit page rendering
  res.render("submit");
};

module.exports.getuserWishPage = async function (req, res) {
  try {
    return res.render("index");
  } catch (error) {
    throw error;
  }
};
