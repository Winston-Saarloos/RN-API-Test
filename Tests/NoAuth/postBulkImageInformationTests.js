var FormData = require('form-data');

// Custom Classes
var recnet = require('../../Classes/recnet');
var utils = require('../../Classes/common');

// Main Function for running all tests in file
async function postImageInformationTests(message, outputDetailedResults) {
    try {
        var TestResults = [];
        TestResults.push(await postImageInformationBulk())
        
        await utils.sendTestResultsMessage('[Post] [No Auth] Image Information Bulk Tests', TestResults, message, outputDetailedResults);
    } catch (error) {
        console.log(error)
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
    var formData = new FormData();
    formData.append('Ids[]', '45084641');
    formData.append('Ids[]', '45083996');
    formData.append('Ids[]', '44246409');

    // Act
    var response = await recnet.postData(szUrl, formData);

    console.log(response);
    // Assert
    return utils.compareResults(response, szTestName, true, szUrl, startTime, testCategory);
}