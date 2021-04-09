// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getAccountTests(message, outputDetailedResults) {
    try {
        var TestResults = [];
        TestResults.push(await getPlayerInformationTest())

        await utils.sendTestResultsMessage('[Get] [No Auth] Account Information Tests', TestResults, message, outputDetailedResults);
    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

module.exports.getAccountTests = getAccountTests;

var testCategory = 'NoAuth/GetAccountTests/';

// GET API CALLS
// getPlayerInformationTest
async function getPlayerInformationTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerInformation";
    var iPlayerId = 5360404;
    var szUrl = `https://accounts.rec.net/account/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, true, szUrl, startTime, testCategory);
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