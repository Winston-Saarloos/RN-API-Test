// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getEventInfoTests(outputDetailedResults, client) {
    try {
        var TestResults = [];
        TestResults.push(await getAllEvents())

        await utils.sendTestResultsMessage('[Get] [No Auth] Event Information Tests', TestResults, outputDetailedResults, client);
    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

module.exports.getEventInfoTests = getEventInfoTests;

var testCategory = 'NoAuth/GetEventInfoTests/';

// GET API CALLS
// getAllEvents
async function getAllEvents() {
    // Parmeters
    var startTime = new Date()
    var iExpectedResponseLength = 64;
    var szTestName = "getAllEvents";
    var szUrl = `https://api.rec.net/api/playerevents/v1`;

    // Act
    var response = await recnet.getData(szUrl);
    var expectedObjectKeyList = ["PlayerEventId", "CreatorPlayerId", "ImageName", "RoomId", "SubRoomId", "ClubId", "Name", "Description", "StartTime", "EndTime", "AttendeeCount", "State", "Accessibility"]

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, expectedObjectKeyList, iExpectedResponseLength);
}