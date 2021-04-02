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

// // GetImageCheers
// async function getImageCheers() {
//     // Parmeters
//     var szTestName = "Get Image Cheers";
//     var iImageId = 11137613;
//     var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/cheers`;
//     var expectedResults = [
//         377516, 1730096,
//        2095391, 2243570,
//        2734780, 2888044,
//        2901737, 2907404
//      ];

//     // Act
//     var response = await recnet.getData(szUrl);

//     // Assert
//     compareTestResults.compareResults(expectedResults, response, szTestName, false, szUrl);
// }

// // GetImageCheers
// async function getImagesOfPlayer() {
//     // Parmeters
//     var szTestName = "Get Player Images";
//     var iPlayerId = 319444;
//     var szUrl = `https://api.rec.net/api/images/v3/feed/player/${iPlayerId}`;
//     var expectedResults = [
//         377516, 1730096,
//        2095391, 2243570,
//        2734780, 2888044,
//        2901737, 2907404
//      ];

//     // Act
//     var response = await recnet.getData(szUrl);

//     // Assert
//     compareTestResults.compareResults(expectedResults, response, szTestName, true, szUrl);
// }

// Test functions
getImageInformationTest();
getImageCommentsTest();
//getImageCommentsTest();
//getImageCheers();
//getImagesOfPlayer();



// https://api.rec.net
// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });