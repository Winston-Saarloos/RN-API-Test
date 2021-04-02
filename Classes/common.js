function compareResults(expected, actual, testName, logResponseToConsole) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(testName + " passed.");
    } else {
        console.log(testName + " results did not match what was expected.");
    };

    if (logResponseToConsole) {console.log(actual);}
}

module.exports.compareResults = compareResults;