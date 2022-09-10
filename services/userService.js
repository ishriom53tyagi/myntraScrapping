const getDb = require("../utils/database").getDb;
const email = require("../services/email");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios').default;

module.exports.saveUserWish = async function (req, res) {

    const db = getDb();

    let urlToPass = req.body.url;
    const response = await axios.get(urlToPass);
    let price = 0

    const dom = new JSDOM(response.data);

    let nodes = dom.window.document.querySelectorAll("script");
    
    nodes.forEach( element => {

        if(element.innerHTML && element.innerHTML.includes('"@type" : "Product"') ) {

            try {
                
                let newData = JSON.parse(element.innerHTML)
                price = newData.offers.price

            }
            catch ( error ) {
                console.log(error)
                throw error
            }

        }

      })

      if(price > 0 ) {

        const db_update = {
          URL: urlToPass ? urlToPass : "",
          email: req.body.email ? req.body.email : "",
          discountedPrice: Number(price) ,
          userWantPriceRange: Number(req.body.userRange),
          status: 1,
        };
  
        console.log("data of DB", db_update);

        let _ = await db.collection("user").insertOne(db_update);

        // await email.startEmailCampaign(req.body.email);

  
      }

  res.render("submit");

};


module.exports.getuserWishPage = async function (req, res) {
  try {
    return res.render("index");
  } catch (error) {
    throw error;
  }
};
