// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getAccountInfoTests(message, outputDetailedResults, client) {
    try {
        var TestResults = [];
        TestResults.push(await getPlayerInformationFromIdTest());
        TestResults.push(await getPlayerInformationFromNameTest());
        TestResults.push(await getPlayerBioFromIdTest());
        TestResults.push(await getPlayerSearchResultsTest());
        TestResults.push(await getIdFromUsername());

        await utils.sendTestResultsMessage('[Get] [No Auth] Account Information Tests', TestResults, message, outputDetailedResults, client);
    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

module.exports.getAccountInfoTests = getAccountInfoTests;

var testCategory = 'NoAuth/GetAccountTests/';

// GET API CALLS
// getPlayerInformationTest
async function getPlayerInformationFromIdTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerInformationFromId";
    var iPlayerId = 5360404;
    var szUrl = `https://accounts.rec.net/account/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// GET API CALLS
// getPlayerInformationFromNameTest
async function getPlayerInformationFromNameTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerInformationFromName";
    var szPlayerName = 'SparklingDeer358';
    var szUrl = `https://accounts.rec.net/account?username=${szPlayerName}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// GET API CALLS
// getPlayerBioFromId
async function getPlayerBioFromIdTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerBioFromId";
    var iPlayerId = 5360404;
    var szUrl = `https://accounts.rec.net/account/${iPlayerId}/bio`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getPlayerSearchResults
// Rec Net Search Bar
async function getPlayerSearchResultsTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerSearchResults";
    var szSeachParameter = 'SparklingDeer358';
    var szUrl = `https://accounts.rec.net/account/search?name=${szSeachParameter}`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['accountId', 'username', 'displayName', 'profileImage', 'isJunior', 'platforms', 'createdAt'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, null);
}

// getIdFromUsername
async function getIdFromUsername() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getIdFromUsername";
    var iPlayerId = 5360404;
    var szUrl = `https://accounts.rec.net/account/${iPlayerId}/username`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}