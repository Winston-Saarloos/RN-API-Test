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
[Get] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getTopCreators|Key Comparison Basic|https://clubs.rec.net/subscription/top/creators?skip=0&take=200|skip={integer}, take={integer}

##NOT CURRENTLY IMPLEMENTED

### Image Database
[Get] [No Authentication]
Test Name| Test Coverage | URI | Query String Parameters
---------|---------------|-----|--------------------------
getImage|N/A|https://img.rec.net/{imagename}| cropSquare={boolean}, width={integer}, height={integer}

Postman Link:
https://documenter.getpostman.com/view/13848200/TVt184DN

All tests will run twice a day, once in the morning and once at night.  I plan to test every possible URI of rec.net including all URI's that require authentication.

While slower than tests that run asyncronously I have developed it to run this way to prevent an over load on rec.net which results in closed connections.

## Result Output
All output from scheduled tests will show a single message for each major category.  This message will be displayed as a embed inside of a Discord message.  If 1 or more tests from a category fail then it will show up as failed (Red).  If all tests pass then the message will show up as passed (Green).  The condensed version of the embed shows total time taken to run tests as well as the total number of tests run.

## Test Results
Most tests will compare the JSON response from a URI to that of an expected results file stored on disk.

For other endpoints which return time sensitive data I will be verifying that each expected key exists in the returned JSON.  The length of a JSON object will also be compared to verify nothing was added that was not expected.

TODO:
Allow advanced key comparison to read expected object from file (some of these have gotten too large for inline code).