const getDb = require("../utils/database").getDb;
const db = require("../utils/database");
const emailService = require("../services/email");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios").default;

db.mongoConnect(async (db) => {
  try {
    const db = getDb();
    let data = await db.collection("user").find({ status: 1 }).toArray();

    console.log(data, "data value is here");
    if (data?.length) {
      for (let x of data) {
        let isNotified = false;
        let campaignCondition = await checkCampaginCondition(x);

        console.log(campaignCondition, "campagin condition");

        if (campaignCondition) {
          if (
            x.email &&
            x.email != "" &&
            x.email != undefined &&
            x.email != null
          ) {
            console.log(x.email, "email value is here");
            console.log("match crone");
            await emailService.matchEmailCampaign(x.email);
            isNotified = true;
          }

          if (isNotified) {
            const _ = await db.collection("user").updateOne(
              { _id: x._id },
              {
                $set: {
                  status: 2,
                },
              }
            );
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  } catch (error) {
    throw error;
  }
});

async function checkCampaginCondition(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      let price = 0;
      const response = await axios.get(userData.URL);
      const dom = new JSDOM(response.data);

      let nodes = dom.window.document.querySelectorAll("script");

      nodes.forEach((element) => {
        if (
          element.innerHTML &&
          element.innerHTML.includes('"@type" : "Product"')
        ) {
          try {
            let newData = JSON.parse(element.innerHTML);
            price = newData.offers.price;
            if (price < userData.userWantPriceRange) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (error) {
            console.log(error);
            throw error;
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}
