var fs = require('fs');
const Discord = require("discord.js");

function compareResults(response, testName, writeResponseToFile, url, startTime) {
    var results = {
        "Name": testName,
        "Status": "",
        "Url" : url,
        "Message": "",
        "Time": 0
        };
    var endTime = new Date()
    var szFilePath = "./ExpectedResults/" + testName + ".json";
    if (writeResponseToFile) {
        var szData = JSON.stringify(response.data, null, 4);
        fs.writeFileSync(szFilePath, szData);
    }

    var seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    var expectedResults = require("." + szFilePath);

    if (JSON.stringify(response.data) === JSON.stringify(expectedResults)) {
        results.Status = 'Passed'
        results.Time = seconds;
    } else {
        results.Status = "Failed"
        results.Time = seconds;
        results.Message = "Test results did not match what was expected";
    };

    return results;
}

module.exports.compareResults = compareResults;