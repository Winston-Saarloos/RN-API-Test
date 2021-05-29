const FormData = require('form-data');

// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function postImageInformationTests(outputDetailedResults, client) {
    try {
        var TestResults = [];
        TestResults.push(await postImageInformationBulk())
        
        await utils.sendTestResultsMessage('[Post] [No Auth] Image Information Bulk Tests', TestResults, outputDetailedResults, client);
    } catch (error) {
        console.trace(error);
        console.log('An error occured performing postImageInformationTests: ' + error)
        // send message in Discord about the error that occurred
    }
};

module.exports.postImageInformationTests = postImageInformationTests;

var testCategory = 'NoAuth/PostImageTests/';

// postImageInformationBulk
async function postImageInformationBulk() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "postImageInformationBulk";
    var szUrl = `https://api.rec.net/api/images/v3/bulk`;
    var data = {
        'id' : [18635056, 5424853]
    };

    // Act
    var response = await recnet.postData(szUrl, data);

    console.log('RESPONSE INFORMATION');
    console.log(response);

    // Assert
    return utils.compareResults(response, szTestName, true, szUrl, startTime, testCategory);
}