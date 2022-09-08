const { spawn } = require("child_process");
const getDb = require("../utils/database").getDb;
const path = require("path");
const email = require("../services/email");

module.exports.saveUserWish = async function (req, res) {

  const db = getDb();
  // spawn new child process to call the python script

  let urlToPass = req.body.url;
  const python = spawn("python3", [
    path.join(__dirname, "../workingFile.py"),
    urlToPass,
  ]);


    let data = "";
    for await (const chunk of python.stdout) {
        console.log('stdout chunk: '+chunk);
        data += chunk;
    }
    let error = "";
    for await (const chunk of python.stderr) {
        console.error('stderr chunk: '+chunk);
        error += chunk;
    }
    const exitCode = await new Promise( (resolve, reject) => {
        python.on('close', resolve);
    });

    if( exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }

    if (data) {
            data = data.replace(/'/g, '"');
            data = JSON.parse(data);
          }

    const db_update = {
      URL: urlToPass ? urlToPass : "",
      email: req.body.email ? req.body.email : "",
      discountedPrice: data?.price,
      totalPrice: data?.mrp,
      userWantPriceRange: Number(req.body.userRange),
      status: 1,
    };

    let _ = await db.collection("user").insertOne(db_update);

    await email.startEmailCampaign(req.body.email);
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
