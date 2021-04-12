// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getImageInfoTests(message, outputDetailedResults, client) {
    try {
        var TestResults = [];
        TestResults.push(await getImageInformationTest())
        TestResults.push(await getImageCommentsTest())
        TestResults.push(await getPlayerImageFeed())
        TestResults.push(await getImageCheers())
        TestResults.push(await getPlayerImages())
        TestResults.push(await getImagesFromEvent())
        TestResults.push(await getImagesTakenInRoom())
        TestResults.push(await getGlobalImageFeed())

        await utils.sendTestResultsMessage('[Get] [No Auth] Image Information Tests', TestResults, message, outputDetailedResults, client);
    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

module.exports.getImageInfoTests = getImageInfoTests;

var testCategory = 'NoAuth/GetImageTests/';

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
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
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
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
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
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
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
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
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
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getImagesFromEvent
async function getImagesFromEvent() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImagesFromEvent";
    var iEventId = 268367;
    var szUrl = `https://api.rec.net/api/images/v1/playerevent/${iEventId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getImagesTakenInRoom
async function getImagesTakenInRoom() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImagesTakenInRoom";
    var iRoomId = 1104928;
    var szUrl = `https://api.rec.net/api/images/v4/room/${iRoomId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getGlobalImageFeed
// RecNet Home
async function getGlobalImageFeed() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getGlobalImageFeed";
    var takeAmount = 5;
    var szUrl = `https://api.rec.net/api/images/v3/feed/global?take=${takeAmount}`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['Id', 'Type', 'Accessibility', 'AccessibilityLocked', 'ImageName', 'Description', 'PlayerId', 'TaggedPlayerIds', 'RoomId', 'PlayerEventId', 'CreatedAt', 'CheerCount', 'CommentCount'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, takeAmount);
}