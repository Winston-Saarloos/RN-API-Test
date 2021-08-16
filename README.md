# RR-API-Test

This system is used to test and verify the Rec.net private API contains the same information from day to day.  Since the private API of Rec.net is not maintained in a way to be consumed by 3rd party developers this system will allow any person to be alerted to changes that may have taken place at any endpoint.

## Test Categories
Each set of tests is broken up into these major categories:

### Image Information
[GET] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getImageComments|Exact Match|https://api.rec.net/api/images/v1/${iImageId}/comments|
getImageInformation|Exact Match|https://api.rec.net/api/images/v4/${iImageId}|
getPlayerImageFeed|Key Comparison Basic|https://api.rec.net/api/images/v3/feed/player/${iPlayerId}|skip={integer}, take={integer}, since={datetime}
getImageCheers|Exact Match|https://api.rec.net/api/images/v1/${iImageId}/cheers|
getPlayerImages|Key Comparison Basic|https://api.rec.net/api/images/v4/player/${iPlayerId}|
getImagesFromEvent|Key Comparison Basic|https://api.rec.net/api/images/v1/playerevent/${iEventId}|
getImagesTakenInRoom|Exact Match|https://api.rec.net/api/images/v4/room/${iRoomId}|
getGlobalImageFeed|Key Comparison Basic|https://api.rec.net/api/images/v3/feed/global?take=${takeAmount}|

### Account Information
[GET] [No Authentication]
Test Name| Test Coverage | URI 
---------|---------------|-----
getPlayerInformationFromId|Exact Match|https://accounts.rec.net/account/${iPlayerId}
getPlayerInformationFromName|Exact Match|https://accounts.rec.net/account?username=${szPlayerName}
getPlayerBioFromId|Exact Match|https://accounts.rec.net/account/${iPlayerId}/bio
getPlayerSearchResults|Key Comparison Basic|https://accounts.rec.net/account/search?name=${szSeachParameter}
getIdFromUsername|Exact Match|https://accounts.rec.net/account/${iPlayerId}/username

### Room Information Tests
[GET] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getRoomInfoFromId|Key Comparison Advanced|https://rooms.rec.net/rooms/bulk?id=${iRoomId}|id={integer}
getRoomInfoFromName|Key Comparison Advanced|https://rooms.rec.net/rooms/bulk?name=${szRoomName}|name={string}
getRoomsOwnedByPlayer|Key Comparison Advanced|https://rooms.rec.net/rooms/ownedby/${iPlayerId}|
getRoomFromSearch|Key Comparison Advanced|https://rooms.rec.net/rooms/bulk?name=${szRoomName}&take=${iTakeAmount}|take={integer}, name={string}
getFeaturedRooms|Key Comparison Advanced|https://rooms.rec.net/featuredrooms/current|
getHotRooms|Key Comparison Basic|https://rooms.rec.net/rooms/hot?skip=0&take=512|skip={integer}, take={integer}
getRoomInfoAdvanced|Key Comparison Advanced|https://rooms.rec.net/rooms?name=reccenter&include=${i}|include={integer}

### Event Information tests
[GET] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getAllEvents|Key Comparison Basic|https://api.rec.net/api/playerevents/v1|
getEventInformationFromId|Exact Match|https://api.rec.net/api/playerevents/v1/${eventId}|
getEventResponses|Exact Match|https://api.rec.net/api/playerevents/v1/${eventId}/responses|
getEventsCreatedByPlayer|Exact Match|https://api.rec.net/api/playerevents/v1/creator/${playerId}|skip={integer}, take={integer}
getEventsFromSearch|Key Comparison Basic|https://api.rec.net/api/playerevents/v1/search?query={eventName}|query={string}
getEventsInRoom|Exact Match|https://api.rec.net/api/playerevents/v1/room/${roomId}|

### Clubs Information tests
[GET] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getTopCreators|Key Comparison Basic|https://clubs.rec.net/subscription/top/creators?skip=0&take=200|skip={integer}, take={integer}

##NOT CURRENTLY IMPLEMENTED

### Image Database
[GET] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getImage|N/A|https://img.rec.net/{imagename}| cropSquare={boolean}, width={integer}, height={integer}

### Advanced Room Info
The 'include={integer}' query string parameter allows you to get advanced information related to a room.  The table below details which values return which pieces of information.

## Base Information (No "include" query param)
```json
[
   {
      "RoomId":170126,
      "IsDorm":false,
      "MaxPlayerCalculationMode":0,
      "MaxPlayers":12,
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
         "CheerCount":177370,
         "FavoriteCount":109087,
         "VisitorCount":24514403,
         "VisitCount":210584134
      }
   }
]
```

### Include = 1
**Subrooms Base**
```json
    "SubRooms": [
        {
            "SubRoomId": 170120,
            "RoomId": 170126,
            "UnitySceneId": "cbad71af-0831-44d8-b8ef-69edafa841f6",
            "Name": "Home",
            "DataBlob": "3ea3d0eaee6f465fa39d66699cf164b8.room",
            "DataBlobHash": "i+iSRUQZWIiji5+QhqwYqgynn+xtp3lTT5/CoxDEzPo=",
            "DataSavedAt": "2021-08-15T16:33:57.8812489Z",
            "IsSandbox": false,
            "MaxPlayers": 12,
            "Accessibility": 1
        }
    ]
```
### Include = 2, 3
**Subrooms Base [+] Additional Properties**
 * SupportsJoinInProgress
 * UseLevelBasedMatchmaking
 * UseAgeBasedMatchmaking
 * UseRecRoyaleMatchMaking
```json
    "SubRooms": [
        {
            "SupportsJoinInProgress": true,
            "UseLevelBasedMatchmaking": false,
            "UseAgeBasedMatchmaking": true,
            "UseRecRoyaleMatchmaking": false
        }
    ]
```
### Include = 4
**Roles**
```json
"Roles": [
        {
            "AccountId": 1852,
            "Role": 20,
            "LastChangedByAccountId": null,
            "InvitedRole": 0
        }
      ]
```
Role ID|Role Name
----------|---------
20|Moderator
30|Co-Owner
255|Owner

### Include = 5, 6
**Subrooms Base, Roles**


Postman Link:
https://documenter.getpostman.com/view/13848200/TVt184DN

All tests will run twice a day, once in the morning and once at night.  I plan to test every possible URI of rec.net including all URI's that require authentication.

While slower than tests that run asyncronously I have developed it to run this way to prevent an over load on rec.net which results in closed/refused connections.

## Result Output
All output from scheduled tests will show a single message for each major category.  This message will be displayed as a embed inside of a Discord message.  If 1 or more tests from a category fail then it will show up as failed (Red).  If all tests pass then the message will show up as passed (Green).  The condensed version of the embed shows total time taken to run tests as well as the total number of tests run.

## Test Results
Most tests will compare the JSON response from a URI to that of an expected results file stored on disk.

For other endpoints which return time sensitive data I will be verifying that each expected key exists in the returned JSON.  The length of a JSON object will also be compared to verify nothing was added that was not expected.

TODO:
Allow advanced key comparison to read expected object from file (some of these have gotten too large for inline code).
