var fs = require('fs');
const Discord = require("discord.js");
var _ = require('lodash');

function compareResults(response, testName, writeResponseToFile, url, startTime, testCategoryPath) {
    var testResults = {
        "Name": testName,
        "Status": "",
        "Uri": url,
        "Message": "",
        "Time": 0,
        "requestStatus": 0
    };

    if (response.status == 200) {
        var szFilePath = `./ExpectedResults/${testCategoryPath}${testName}.json`;
        if (writeResponseToFile) {
            console.log('Writing expected results file.');
            var szData = JSON.stringify(response.data, null, 4);
            fs.writeFileSync(szFilePath, szData);
        }

        var expectedResults = require("." + szFilePath);

        if (JSON.stringify(response.data) === JSON.stringify(expectedResults)) {
            testResults.Status = "Passed"
        } else {
            testResults.Status = "Failed"
            testResults.Message = "Test results did not match what was expected.";
        };

    } else {
        testResults.Status = "Failed";
    }

    testResults.requestStatus = response.status;

    var endTime = new Date()
    var seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    testResults.Time = seconds;

    return testResults;
}

module.exports.compareResults = compareResults;

// Compares the specific keys and length of an object
//   This function is best used when comparing the results of objects that are time sensitive
function compareSpecificResults(response, testName, url, startTime, objectKeyList, responseLength) {
    var testResults = {
        "Name": testName,
        "Status": "",
        "Uri": url,
        "Message": "",
        "Time": 0,
        "requestStatus": 0
    }

    if (response.status == 200) {

        // Verify the response returned the correct number of results
        if (responseLength != null) {
            if (response.data.length == responseLength) {
                testResults.Status = "Passed";
            } else {
                testResults.Message += "Response did not contain the expected number of objects.  ";
            };
        };

        // Verify a single object's length
        var singleObject = response.data[0];
        if (Object.keys(singleObject).length == objectKeyList.length) {
            testResults.Status = "Passed"
        } else {
            testResults.Message += `Single response object did not contain the expected number of keys [${objectKeyList.length}].  `;
        };

        objectKeyList.forEach(element => {
            if (!(singleObject.hasOwnProperty(element))) {
                testResults.Message += `Single object from response did not contain expected key [${element}].  `
            }
        });

        if (testResults.Message != '') {
            testResults.Status = "Failed";
        }

    } else {
        testResults.Status = "Failed";
    }

    testResults.requestStatus = response.status;
    var endTime = new Date()
    var seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    testResults.Time = seconds;

    return testResults;
}

module.exports.compareSpecificResults = compareSpecificResults;

async function sendTestResultsMessage(testCategoryTitle, testResults, message, outputDetailedResults) {
    const greenCheckMark = 'https://discord.com/assets/212e30e47232be03033a87dc58edaa95.svg';
    const redX = 'https://discord.com/assets/8becd37ab9d13cdfe37c08c496a9def3.svg';
    if (!testResults) { return; }
    if (outputDetailedResults) {
        for (index = 0; index < testResults.length; index++) {
            const testResultEmbed = new Discord.MessageEmbed();
            var testResultCount = testResults.length;

            var statusIcon = '';
            if (testResults[index].Status == "Passed") {
                testResultEmbed.setColor("#4aff3d");
                statusIcon = greenCheckMark;
            } else {
                testResultEmbed.setColor("#fc1100");
                statusIcon = redX;
            }

            testResultEmbed.setTitle(`${testCategoryTitle} [${index + 1}/${testResultCount}]`);
            testResultEmbed.setThumbnail(statusIcon);
            testResultEmbed.addFields(
                { name: "Test Name: " + testResults[index].Name, value: "--------", inline: false },
                { name: 'Status:', value: testResults[index].Status, inline: true },
                { name: 'URI Status: ', value: testResults[index].requestStatus, inline : true },
                { name: 'Test Duration:', value: `${testResults[index].Time} sec`, inline: true }
            )

            if (testResults[index].Message != '') {
                testResultEmbed.addField('Message', testResults[index].Message, false);
            }

            testResultEmbed.setFooter(testResults[index].Uri);

            message.channel.send(testResultEmbed);
        }
    } else {
        var totalTime = 0;
        var totalTests = testResults.length;
        var totalPassed = 0;
        var totalFailed = 0;
        var statusIcon = '';

        const testResultEmbed = new Discord.MessageEmbed();
        testResults.forEach(result => {
            totalTime += result.Time;
            if (result.Status == "Passed") {
                totalPassed += 1;
            } else {
                totalFailed += 1;
            }
        });

        if (totalFailed == 0) {
            testResultEmbed.setColor("#4aff3d");
            statusIcon = greenCheckMark;
        } else {
            testResultEmbed.setColor("#fc1100");
            statusIcon = redX;
        }

        testResultEmbed.setTitle(`${testCategoryTitle}`);
        testResultEmbed.setThumbnail(statusIcon);
        testResultEmbed.addFields(
            { name: "Passed: " + totalPassed, value: "Failed: " + totalFailed, inline: true },
            { name: 'Test Status: ', value: ((totalFailed == 0) ? 'Passed' : 'Failed'), inline: true },
            { name: 'Total Test Duration:', value: `${totalTime} sec`, inline: true },
            { name: "Total Tests: ", value: totalTests, inline: true}
        )

        message.channel.send(testResultEmbed);
    }
}

module.exports.sendTestResultsMessage = sendTestResultsMessage;

// Compares the specific keys and length of an object
//   This function is best used when comparing the results of objects that are time sensitive
function compareResultObjects(response, testName, url, startTime, expectedObject) {
    var testResults = {
        "Name": testName,
        "Status": "",
        "Uri": url,
        "Message": "",
        "Time": 0,
        "requestStatus": 0
    }

    if (response.status == 200) {

        testResults.Message = compareValues(response.data, expectedObject);

    } else {
        testResults.Status = "Failed";
    }

    if (testResults.Message != '') {
        testResults.Status = "Failed";
    } else {
        testResults.Status = "Passed";
    }

    testResults.requestStatus = response.status;
    var endTime = new Date()
    var seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    testResults.Time = seconds;

    return testResults;
}

module.exports.compareResultObjects = compareResultObjects;

var resultCollection = [];

function compareValues(JSONObjectA, JSONObjectB) {
    var message = '';
    var object1 = JSONObjectA;
    var object2 = JSONObjectB;
    resultCollection = new Array();

    if (typeof object1 === 'object') {
        var keysA = Object.keys(object1).sort(),
            keysB = Object.keys(object2).sort();

        //if a and b are objects with different no of keys, unequal
        if (keysA.length !== keysB.length) {
            message += `Response JSON is not the same length as expected JSON. Expected Length: [${keysB.length}] \n`;
        }

        //if keys aren't all the same, unequal
        var currentA, currentB;
        if (!keysA.every(function (k, i) { console.log(`[${k} === ${keysB[i]}]  [${k === keysB[i]}]`); currentA = k; currentB = keysB[i]; return k === keysB[i]; })) {
            message += `Actual and expected keys do not match. [${currentA} did not equal ${currentB}] \n`;
        }

        var currentKey;
        //recurse on the values for each key
        var passed = keysA.every(function (key) {
            //if we made it here, they have identical keys
            currentKey = key;
            var result = compareValue(object1[key], object2[key]);
            resultCollection.push(result);
            console.log(result.status);
            return result.status;
        });

        if (passed != true) {
            message += `Actual and expected keys did not match.  Difference occured at: [${currentKey}] \n`;
        }
        //for primitives just use a straight up check
    }

    for (index = 0; index < resultCollection.length; index++) {
        if (resultCollection[index].message != '') {
            message += resultCollection[index].message + " \n";
        }
    };

    return message;
}

function compareValue(object1, object2) {

    if ((object1 != null || object1 != undefined) && typeof object1 === 'object') {
        var keysA = Object.keys(object1).sort(),
            keysB = Object.keys(object2).sort();

        //if a and b are objects with different no of keys, unequal
        if (keysA.length !== keysB.length) {
            console.log('Keys are not the same length');
            resultCollection.push({"status": false, "message": message = `Response JSON is not the same length as expected JSON. Expected Length: [${keysB.length}]`});
            return false;
        }

        //if keys aren't all the same, unequal
        var currentA, currentB;
        if (!keysA.every(function (k, i) { console.log(`[${k} === ${keysB[i]}]  [${k === keysB[i]}]`); currentA = k; currentB = keysB[i]; return k === keysB[i]; })) {
            resultCollection.push({"status": false, "message": `Actual and expected keys do not match. [${currentA} did not equal ${currentB}]`});
            return false;
        }

        //recurse on the values for each key
        var currentKey;
        var passed = keysA.every(function (key) {
            //if we made it here, they have identical keys
            currentKey = key;
            var result = compareValue(object1[key], object2[key])
            if (result == false || result.status == false) {
                resultCollection.push({"status": ((result.status != undefined) ? result.status : result), "message": ((result.message != undefined) ? result.message : '')});
            }
            return result.status;
        });

        if (passed != true) {
            resultCollection.push({"status": false, "message": `Actual and expected keys did not match.  Difference occured at: [${currentKey}]`});
            return false;
        }
    }

    var message = '';
    var status = true;
    for (index = 0; index < resultCollection.length; index++) {
        if (resultCollection[index].message != '' && status == true) {
            status = false;
        }
    };

    return {"status" : true, "message": ''};
}

// //true if their structure, values, and keys are identical    
// var passed = compareValues(jsonA, jsonB); 