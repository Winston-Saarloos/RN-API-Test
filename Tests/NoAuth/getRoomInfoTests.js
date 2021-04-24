// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function getRoomInfoTests(outputDetailedResults, client) {
  try {
    var TestResults = [];
    TestResults.push(await getRoomInfoFromId());
    TestResults.push(await getRoomInfoFromName());
    TestResults.push(await getRoomsOwnedByPlayer());
    TestResults.push(await getRoomFromSearch());
    TestResults.push(await getFeaturedRooms());
    TestResults.push(await getHotRooms());

    await utils.sendTestResultsMessage('[Get] [No Auth] Room Information Tests', TestResults, outputDetailedResults, client);
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
  var expectedObject = [
    {
      "RoomId": 170126,
      "IsDorm": false,
      "MaxPlayerCalculationMode": 0,
      "MaxPlayers": 12,
      "CloningAllowed": false,
      "DisableMicAutoMute": false,
      "DisableRoomComments": false,
      "EncryptVoiceChat": false,
      "LoadScreenLocked": false,
      "Name": "RecCenter",
      "Description": "A social hub to meet and mingle with friends new and old.",
      "ImageName": "22eefa3219f046fd9e2090814650ede3",
      "WarningMask": 0,
      "CustomWarning": null,
      "CreatorAccountId": 1,
      "State": 0,
      "Accessibility": 1,
      "SupportsLevelVoting": false,
      "IsRRO": true,
      "SupportsScreens": true,
      "SupportsWalkVR": true,
      "SupportsTeleportVR": true,
      "SupportsVRLow": true,
      "SupportsQuest2": true,
      "SupportsMobile": true,
      "SupportsJuniors": true,
      "MinLevel": 0,
      "CreatedAt": "2018-08-28T15:44:47.3149535Z",
      "Stats": {
        "CheerCount": 150832,
        "FavoriteCount": 89229,
        "VisitorCount": 20373636,
        "VisitCount": 156794498
      }
    }
  ]

  // Assert
  return utils.compareResultObjects(response, szTestName, szUrl, startTime, expectedObject);
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
  var expectedObject = [
    {
      "RoomId": 170126,
      "IsDorm": false,
      "MaxPlayerCalculationMode": 0,
      "MaxPlayers": 12,
      "CloningAllowed": false,
      "DisableMicAutoMute": false,
      "DisableRoomComments": false,
      "EncryptVoiceChat": false,
      "LoadScreenLocked": false,
      "Name": "RecCenter",
      "Description": "A social hub to meet and mingle with friends new and old.",
      "ImageName": "22eefa3219f046fd9e2090814650ede3",
      "WarningMask": 0,
      "CustomWarning": null,
      "CreatorAccountId": 1,
      "State": 0,
      "Accessibility": 1,
      "SupportsLevelVoting": false,
      "IsRRO": true,
      "SupportsScreens": true,
      "SupportsWalkVR": true,
      "SupportsTeleportVR": true,
      "SupportsVRLow": true,
      "SupportsQuest2": true,
      "SupportsMobile": true,
      "SupportsJuniors": true,
      "MinLevel": 0,
      "CreatedAt": "2018-08-28T15:44:47.3149535Z",
      "Stats": {
        "CheerCount": 150833,
        "FavoriteCount": 89229,
        "VisitorCount": 20373686,
        "VisitCount": 156795310
      }
    }
  ]

  // Assert
  return utils.compareResultObjects(response, szTestName, szUrl, startTime, expectedObject);
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
      "RoomId": 170126,
      "IsDorm": false,
      "MaxPlayerCalculationMode": 0,
      "MaxPlayers": 12,
      "CloningAllowed": false,
      "DisableMicAutoMute": false,
      "DisableRoomComments": false,
      "EncryptVoiceChat": false,
      "LoadScreenLocked": false,
      "Name": "RecCenter",
      "Description": "A social hub to meet and mingle with friends new and old.",
      "ImageName": "22eefa3219f046fd9e2090814650ede3",
      "WarningMask": 0,
      "CustomWarning": null,
      "CreatorAccountId": 1,
      "State": 0,
      "Accessibility": 1,
      "SupportsLevelVoting": false,
      "IsRRO": true,
      "SupportsScreens": true,
      "SupportsWalkVR": true,
      "SupportsTeleportVR": true,
      "SupportsVRLow": true,
      "SupportsQuest2": true,
      "SupportsMobile": true,
      "SupportsJuniors": true,
      "MinLevel": 0,
      "CreatedAt": "2018-08-28T15:44:47.3149535Z",
      "Stats": {
        "CheerCount": 150833,
        "FavoriteCount": 89229,
        "VisitorCount": 20373715,
        "VisitCount": 156795718
      }
    }
  ];

  // Assert
  return utils.compareResultObjects(response, szTestName, szUrl, startTime, expectedObject);
}

// getFeaturedRooms
async function getFeaturedRooms() {
  // Parmeters
  var startTime = new Date()
  var szTestName = "getFeaturedRooms";
  var szUrl = `https://rooms.rec.net/featuredrooms/current`;

  // Act
  var response = await recnet.getData(szUrl);

  var expectedObject = {
    "FeaturedRoomGroupId": 135,
    "Name": "Featured Rooms",
    "StartAt": "2021-04-20T07:00:00Z",
    "EndAt": "2021-04-27T07:00:00Z",
    "Rooms": [
      {
        "RoomId": 16324421,
        "RoomName": "kyoshi-island",
        "ImageName": "4d3b5e69f15a462c839043a15890a082.jpg"
      },
      {
        "RoomId": 19722764,
        "RoomName": "PIXELREC_3D",
        "ImageName": "b1d41d1f87534862b3688828811f21bc.jpg"
      },
      {
        "RoomId": 8063030,
        "RoomName": "TheOakLounge",
        "ImageName": "a583175c11d74f9788e73ac2662c337d.jpg"
      },
      {
        "RoomId": 21382048,
        "RoomName": "_WOAH_",
        "ImageName": "633054212169423ebd8db948bf4ac9ad.jpg"
      },
      {
        "RoomId": 19881694,
        "RoomName": "TheLakesideLodge",
        "ImageName": "67b1c0639e77471ebc03292ab586bcc8.jpg"
      },
      {
        "RoomId": 19809827,
        "RoomName": "-SUBURBS-PVP-",
        "ImageName": "6ba0d04addcb4ade836b63991e056dba.jpg"
      },
      {
        "RoomId": 18061160,
        "RoomName": "SirWarlingtonsTown",
        "ImageName": "991b045e16834eeeae7d61ee44c4c339.jpg"
      },
      {
        "RoomId": 20602759,
        "RoomName": "LandScapeDrive",
        "ImageName": "724d7107ba9442158146ce89dc1502a0.jpg"
      },
      {
        "RoomId": 17494800,
        "RoomName": "-Pulse-",
        "ImageName": "9b9108182f6d4d049bc1ae933066a6da.jpg"
      },
      {
        "RoomId": 16677494,
        "RoomName": "PARKOUR.CLASSIC",
        "ImageName": "e081c1467bb946eab6b2c384112b0ff9.jpg"
      }
    ]
  }

  // Assert
  return utils.compareResultObjects(response, szTestName, szUrl, startTime, expectedObject);
}

// getHotRooms
async function getHotRooms() {
  // Parmeters
  var startTime = new Date()
  var szTestName = "getHotRooms";
  var iTakeAmount = 3;
  var szUrl = `https://rooms.rec.net/rooms/hot?skip=0&take=${iTakeAmount}`;

  // Act
  var response = await recnet.getData(szUrl);

  var expectedObject = {
    "Results":[
       {
          "RoomId":9778145,
          "IsDorm":false,
          "MaxPlayerCalculationMode":0,
          "MaxPlayers":1,
          "CloningAllowed":false,
          "DisableMicAutoMute":false,
          "DisableRoomComments":false,
          "EncryptVoiceChat":false,
          "LoadScreenLocked":false,
          "Name":"MidnightMetalsParkour",
          "Description":"A 60 stage parkour course looming over a luminous city at night. Run, jump, and climb your way to victory.  (Uses Circuits V2)",
          "ImageName":"1ab41734c8224b21a2113628257cd32e.jpg",
          "WarningMask":40,
          "CustomWarning":"This room may be broken by the most recent update. I will fix it later",
          "CreatorAccountId":558687,
          "State":0,
          "Accessibility":1,
          "SupportsLevelVoting":false,
          "IsRRO":false,
          "SupportsScreens":true,
          "SupportsWalkVR":true,
          "SupportsTeleportVR":false,
          "SupportsVRLow":true,
          "SupportsQuest2":true,
          "SupportsMobile":true,
          "SupportsJuniors":true,
          "MinLevel":0,
          "CreatedAt":"2020-10-12T20:51:13.6782911Z",
          "Stats":{
             "CheerCount":9304,
             "FavoriteCount":10107,
             "VisitorCount":161049,
             "VisitCount":234157
          }
       },
       {
          "RoomId":10266980,
          "IsDorm":false,
          "MaxPlayerCalculationMode":0,
          "MaxPlayers":27,
          "CloningAllowed":false,
          "DisableMicAutoMute":false,
          "DisableRoomComments":false,
          "EncryptVoiceChat":false,
          "LoadScreenLocked":false,
          "Name":"SurviveTheCarCrash1.0",
          "Description":"In This Game You Can Crash A Car!",
          "ImageName":"35452b824e974af78f4acf3bcc2172ef.jpg",
          "WarningMask":0,
          "CustomWarning":null,
          "CreatorAccountId":3315363,
          "State":0,
          "Accessibility":1,
          "SupportsLevelVoting":false,
          "IsRRO":false,
          "SupportsScreens":true,
          "SupportsWalkVR":true,
          "SupportsTeleportVR":true,
          "SupportsVRLow":true,
          "SupportsQuest2":true,
          "SupportsMobile":true,
          "SupportsJuniors":true,
          "MinLevel":0,
          "CreatedAt":"2020-10-31T16:52:48.5293172Z",
          "Stats":{
             "CheerCount":11208,
             "FavoriteCount":10277,
             "VisitorCount":81927,
             "VisitCount":124257
          }
       },
       {
          "RoomId":7063823,
          "IsDorm":false,
          "MaxPlayerCalculationMode":0,
          "MaxPlayers":20,
          "CloningAllowed":false,
          "DisableMicAutoMute":false,
          "DisableRoomComments":false,
          "EncryptVoiceChat":false,
          "LoadScreenLocked":false,
          "Name":"Memeplanetpvp",
          "Description":"Battle each other in this meme PVP map!",
          "ImageName":"c851f5d4135d43a98e18b2598ddb0877.jpg",
          "WarningMask":0,
          "CustomWarning":null,
          "CreatorAccountId":5101513,
          "State":0,
          "Accessibility":1,
          "SupportsLevelVoting":false,
          "IsRRO":false,
          "SupportsScreens":true,
          "SupportsWalkVR":true,
          "SupportsTeleportVR":false,
          "SupportsVRLow":true,
          "SupportsQuest2":true,
          "SupportsMobile":true,
          "SupportsJuniors":true,
          "MinLevel":0,
          "CreatedAt":"2020-06-09T11:59:06.2452393Z",
          "Stats":{
             "CheerCount":115971,
             "FavoriteCount":96637,
             "VisitorCount":750802,
             "VisitCount":1585645
          }
       }
    ],
    "TotalResults":437033
 }

  // Assert
  return utils.compareResultObjects(response, szTestName, szUrl, startTime, expectedObject);
}