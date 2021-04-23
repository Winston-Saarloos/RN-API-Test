// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getClubInfoTests(outputDetailedResults, client) {
    try {
        var TestResults = [];
        TestResults.push(await getTopCreators())

        await utils.sendTestResultsMessage('[Get] [No Auth] Club Information Tests', TestResults, outputDetailedResults, client);
    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

module.exports.getClubInfoTests = getClubInfoTests;

var testCategory = 'NoAuth/GetClubTests/';

// Batch up API calls into groups
//
// GET API CALLS
// getTopCreators
async function getTopCreators() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getTopCreators";
    var takeAmount = 200;
    var szUrl = `https://clubs.rec.net/subscription/top/creators?skip=0&take=200`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['accountId', 'clubId', 'subscriberCount'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, takeAmount);
}