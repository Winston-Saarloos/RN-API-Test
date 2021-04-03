var fs = require('fs');

function compareResults(actual, testName, writeResponseToFile, url) {
    var szFilePath = "./ExpectedResults/" + testName + ".json";
    if (writeResponseToFile) {
        var szData = JSON.stringify(actual, null, 4);
        fs.writeFileSync(szFilePath, szData);
    }

    var expectedResults = require("." + szFilePath);

    if (JSON.stringify(actual) === JSON.stringify(expectedResults)) {
        console.log(`${testName} test passed.  [${url}]`);
    } else {
        console.log(`${testName} test results did not match what was expected.  [${url}]`);
    };
}

module.exports.compareResults = compareResults;