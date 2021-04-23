// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getEventInfoTests(outputDetailedResults, client) {
    try {
        var TestResults = [];
        TestResults.push(await getAllEvents());
        TestResults.push(await getEventInformationFromId());
        TestResults.push(await getEventResponses());
        TestResults.push(await getEventsCreatedByPlayer());
        TestResults.push(await getEventsFromSearch());
        TestResults.push(await getEventsInRoom());

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

// getEventInformation
async function getEventInformationFromId() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getEventInformationFromId";
    var iEventId = 173539;
    var szUrl = `https://api.rec.net/api/playerevents/v1/${iEventId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getEventResponse
async function getEventResponses() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getEventResponses";
     var iEventId = 268367;
     var szUrl = `https://api.rec.net/api/playerevents/v1/${iEventId}/responses`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['PlayerEventResponseId', 'PlayerEventId', 'PlayerId', 'CreatedAt', 'Type'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, null);
}

//getEventsCreatedByPlayer
async function getEventsCreatedByPlayer() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getEventsCreatedByPlayer";
    var iPlayerId = 5360404;
    var szUrl = `https://api.rec.net/api/playerevents/v1/creator/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getEventsFromSearch
// Event Search Bar
async function getEventsFromSearch() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerSearchResults";
    var szSeachParameter = 'PVP';
    var szUrl = `https://api.rec.net/api/playerevents/v1/search?query=${szSeachParameter}&take=5`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['PlayerEventId', 'CreatorPlayerId', 'ImageName', 'RoomId', 'SubRoomId', 'ClubId', 'Name', 'Description', 'StartTime', 'EndTime', 'AttendeeCount', 'State', 'Accessibility'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, 5);
}

//getEventsInRoom
async function getEventsInRoom() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getEventsInRoom";
    var iRoomId = 10745113;
    var szUrl = `https://api.rec.net/api/playerevents/v1/room/${iRoomId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}