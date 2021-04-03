const schedule = require('node-schedule');

// Custom Classes
var recnet = require('./Classes/recnet');
var compareTestResults = require('./Classes/common');

// GET API CALLS
console.log('=================================={ GET }=====================================');
// GetImageInformationTest
async function getImageInformationTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImageInformation";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v4/${iImageId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetImageCommentsTest
async function getImageCommentsTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImageComments";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/comments`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetImageCommentsTest
async function getImageCheers() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImageCheers";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/cheers`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetPlayerImageFeed
async function getPlayerImageFeed() {
    // Parmeters
    var startTime = new Date()
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
    compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
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