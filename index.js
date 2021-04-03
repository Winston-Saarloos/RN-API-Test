const schedule = require('node-schedule');
const fs = require('fs');

// Custom Classes
var recnet = require('./Classes/recnet');
var compareTestResults = require('./Classes/common');

// Require Tests List

// funciton writeExpectedResultsToFile() {

// }


// GET API CALLS

// GetImageInformationTest
async function getImageInformationTest() {
    // Parmeters
    var szTestName = "getImageInformation";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v4/${iImageId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl);
}

//GetImageCommentsTest
async function getImageCommentsTest() {
    // Parmeters
    var szTestName = "getImageComments";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/comments`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl);
}

//GetImageCommentsTest
async function getImageCheers() {
    // Parmeters
    var szTestName = "getImageCheers";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/cheers`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl);
}

//GetPlayerImageFeed
async function getPlayerImageFeed() {
    // Parmeters
    var szTestName = "getPlayerImageFeed";
    var iPlayerId = 319444;
    // URL parameters 
    // ?take
    // ?skip
    // ?since
    var szUrl = `https://api.rec.net/api/images/v3/feed/player/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl);
}

// Test functions
getImageInformationTest();
getImageCommentsTest();
getPlayerImageFeed();
getImageCheers();



// https://api.rec.net
// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });