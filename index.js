const schedule = require('node-schedule');

// Custom Classes
var recnet = require('./Classes/recnet');
var compareTestResults = require('./Classes/common');


// Batch up API calls into groups
//
// GET API CALLS
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

//GetPlayerImages
async function getPlayerImages() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerImages";
    var iPlayerId = 319444;
    // URL parameters 
    // ?take
    // ?skip
    // ?since
    var szUrl = `https://api.rec.net/api/images/v4/player/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//getImagesFromEvent
async function getImagesFromEvent() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImagesFromEvent";
    var iEventId = 268367;
    var szUrl = `https://api.rec.net/api/images/v1/playerevent/${iEventId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

// Test functions
async function runTests() {
    try {
        console.log('=================================={[ GET (No Auth) ]}=====================================');
        await (getImageInformationTest())
        await (getImageCommentsTest())
        await (getPlayerImageFeed())
        await (getImageCheers())
        await (getPlayerImages())
        await (getImagesFromEvent())
    
        console.log("All tests completed.");

    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

runTests();

// // GetImageInformationTest
// async function getImageInformationTest() {
//     // Parmeters
//     var startTime = new Date()
//     var szTestName = "getImageInformation";
//     var iImageId = 11137613;
//     var szUrl = `https://api.rec.net/api/images/v4/${iImageId}`;
//     var iTotalItemsInResponse = 0;
//     var iTotalItemsInResponseItem = 0;


//     // Act
//     var response = await recnet.getData(szUrl);

//     // Assert
//     compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
// }

// async function runSingleTest() {
//     await (getImageInformationTestTest())
// }

// runSingleTest();

// https://api.rec.net
// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });