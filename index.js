const schedule = require('node-schedule');
const fs = require('fs');

// Custom Classes
var recnet = require('./Classes/recnet');
var compareTestResults = require('./Classes/common');

// Require Tests List

function getExpectedResults(path) {
    let fileData = fs.readFileSync(path, 'utf8');
    let parsedData = JSON.parse(fileData);
    return parsedData;
}

// funciton writeExpectedResultsToFile() {

// }


// GET API CALLS

// GetImageInformationTest
async function getImageInformationTest() {
    // Parmeters
    var szTestName = "Get Image Information Test";
    var iImageId = 11137613;
    var szUrl = "https://api.rec.net/api/images/v4/" + iImageId;
    var expectedResults = {
        Id: 11137613,
        Type: 1,
        Accessibility: 1,
        AccessibilityLocked: false,
        ImageName: '25cd5012f71f4202bca041083f7f2e55.jpg',
        Description: null,
        PlayerId: 1546112,
        TaggedPlayerIds: [ 256147, 1546112 ],
        RoomId: 170135,
        PlayerEventId: null,
        CreatedAt: '2019-12-07T08:22:41.7834511Z',
        CheerCount: 8,
        CommentCount: 1
    };

    // Act
    var response = await recnet.getData(szUrl);

    //console.log(response);
    // Assert
    compareTestResults.compareResults(expectedResults, response, szTestName, false);
    return response;
}

// GetImageCommentsTest
async function getImageCommentsTest() {
    // Parmeters
    var szTestName = "Get Image Comments Test";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/comments`;
    var expectedResults = [
        {
          SavedImageCommentId: 42103,
          SavedImageId: 11137613,
          PlayerId: 319444,
          Comment: 'narcissist'
        }
    ];

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(expectedResults, response, szTestName, false);
}

// GetImageCheers
async function getImageCheers() {
    // Parmeters
    var szTestName = "Get Image Cheers Test";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/cheers`;
    var expectedResults = [
        377516, 1730096,
       2095391, 2243570,
       2734780, 2888044,
       2901737, 2907404
     ];

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    compareTestResults.compareResults(expectedResults, response, szTestName, false);
}

// Test functions
getImageInformationTest();
getImageCommentsTest();
getImageCheers();



// https://api.rec.net
// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });