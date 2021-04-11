// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getRoomInfoTests(message, outputDetailedResults) {
    try {
        var TestResults = [];
        //TestResults.push(await getRoomInfoFromId())
        //TestResults.push(await getRoomInfoFromName())
        //TestResults.push(await getRoomsOwnedByPlayer())
        TestResults.push(await getRoomFromSearch())

        await utils.sendTestResultsMessage('[Get] [No Auth] Room Information Tests', TestResults, message, outputDetailedResults);
    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};

module.exports.getRoomInfoTests = getRoomInfoTests;

var testCategory = 'NoAuth/GetRoomInfoTests/';

// Batch up API calls into groups
//
// GET API CALLS
// getRoomInfoFromIdTest
async function getRoomInfoFromId() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getRoomInfoFromId";
    var iRoomId = 170126;
    var szUrl = `https://rooms.rec.net/rooms/bulk?id=${iRoomId}`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['RoomId', 'IsDorm', 'CloningAllowed', 'DisableMicAutoMute', 'DisableRoomComments', 'EncryptVoiceChat', 
                         'LoadScreenLocked', 'Name', 'Description', 'ImageName', 'WarningMask', 'CustomWarning', 'CreatorAccountId', 
                         'State', 'Accessibility', "SupportsLevelVoting", "IsRRO", "SupportsScreens", "SupportsWalkVR", "SupportsTeleportVR",
                         'SupportsVRLow', 'SupportsQuest2', 'SupportsMobile', 'SupportsJuniors', 'MinLevel', 'CreatedAt', 'Stats'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, null);
}

// getRoomInfoFromNameTest
async function getRoomInfoFromName() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getRoomInfoFromName";
    var szRoomName = "Reccenter";
    var szUrl = `https://rooms.rec.net/rooms/bulk?name=${szRoomName}`;

    // Act
    var response = await recnet.getData(szUrl);
    var objectKeyList = ['RoomId', 'IsDorm', 'CloningAllowed', 'DisableMicAutoMute', 'DisableRoomComments', 'EncryptVoiceChat', 
                         'LoadScreenLocked', 'Name', 'Description', 'ImageName', 'WarningMask', 'CustomWarning', 'CreatorAccountId', 
                         'State', 'Accessibility', "SupportsLevelVoting", "IsRRO", "SupportsScreens", "SupportsWalkVR", "SupportsTeleportVR",
                         'SupportsVRLow', 'SupportsQuest2', 'SupportsMobile', 'SupportsJuniors', 'MinLevel', 'CreatedAt', 'Stats'];

    // Assert
    return utils.compareSpecificResults(response, szTestName, szUrl, startTime, objectKeyList, null);
}

// getRoomsOwnedByPlayerTests
async function getRoomsOwnedByPlayer() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getRoomsOwnedByPlayer";
    var iPlayerId = 1546112;
    var szUrl = `https://rooms.rec.net/rooms/ownedby/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return utils.compareResults(response, szTestName, false, szUrl, startTime, testCategory);
}

// getRoomFromSearch
async function getRoomFromSearch() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getRoomFromSearch";
    var szRoomName = "Reccenter";
    var iTakeAmount = 1;
    var szUrl = `https://rooms.rec.net/rooms/bulk?name=${szRoomName}&take=${iTakeAmount}`;

    // Act
    var response = await recnet.getData(szUrl);
    //console.log(response.data);
    var expectedObject = [
        {
           "RoomId":170126,
           "IsDorm":false,
           "CloningAllowed":false,
           "DisableMicAutoMute":false,
           "DisableRoomComments":false,
           "EncryptVoiceChat":false,
           "LoadScreenLocked":false,
           "Name":"RecCenter",
           "Description":"A social hub to meet and mingle with friends new and old.",
           "ImageName":"22eefa3219f046fd9e2090814650ede3",
           "WarningMask":0,
           "CustomWarning":null,
           "CreatorAccountId":1,
           "State":0,
           "Accessibility":1,
           "SupportsLevelVoting":false,
           "IsRRO":true,
           "SupportsScreens":true,
           "SupportsWalkVR":true,
           "SupportsTeleportVR":true,
           "SupportsVRLow":true,
           "SupportsQuest2":true,
           "SupportsMobile":true,
           "SupportsJuniors":true,
           "MinLevel":0,
           "CreatedAt":"2018-08-28T15:44:47.3149535Z",
           "Stats":{
              "CheerCount":147483,
              "FavoriteCount":86867,
              "VisitorCount":20021274,
              "VisitCount":151534897
           }
        }
     ];

    // Assert
    return utils.compareResultObjects(response, szTestName, szUrl, startTime, expectedObject);
}