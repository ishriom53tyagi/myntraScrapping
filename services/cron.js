const getDb = require('../utils/database').getDb
const db = require('../utils/database')
const path = require('path')
const emailService = require("../services/email");

const {spawn} = require('child_process');

db.mongoConnect(async (db) => {

        try {
                const db = getDb()
                let data = await db.collection('user').find( { status : 1}).toArray()

                if( data?.length ) {

                  for await( let x of data ) {
                      
                        let isNotified = false;
                        let campaignCondition = await checkCampaginCondition(x);
    
                        console.log(campaignCondition , "campagin condition");
    
                        if( campaignCondition ) {
        
                            if( x.email && x.email !="" && x.email != undefined  && x.email!= null ) {

                                await emailService.startEmailCampaign(x.email);
                                isNotified = true;
                            }

        
                            if(isNotified) {
        
                                const _ = await db.collection('user').updateOne( { _id : x._id} , {
                                    $set : {
                                        status : 2
                                    }
                                })
                            }
                        }
                        await new Promise(resolve => setTimeout(resolve, 5000));
                      
                    }
                }

        }
        catch ( error ) {
            throw error;
        }

})

      


async function checkCampaginCondition ( userData ) {

        return new Promise (( resolve , reject ) => {

            try {
                if(userData) {
                    let dataToSend;
                    const python = spawn('python3', [ path.join(__dirname, '../workingFile.py') , userData.URL]);
        
                    // collect data from script
                    python.stdout.on('data', async function (data) {
                    dataToSend = data.toString();
                    });
                    // in close event we are sure that stream from child process is closed
                    python.on('close', async (code) => {
                    console.log(`child process close all stdio with code ${code}`);
                    // send data to browser
                    try {
                        if(dataToSend) {
                
                            dataToSend = dataToSend.replace(/'/g, '"');
                            dataToSend = JSON.parse(dataToSend);
                        }
                    }
                    catch( error ) {
                        console.log( error );
                        resolve(false);
                    }
                    
                    if( dataToSend ) {
                        
                        console.log(Number(dataToSend?.price) , Number(userData.userWantPriceRange))

                        if( Number(dataToSend?.price) <= Number(userData.userWantPriceRange) ) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
        
                })
            }
    }
    catch ( error ) {
      console.log(error );
      resolve(false)
    }
})



}
