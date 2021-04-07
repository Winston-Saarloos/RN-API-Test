var fs = require('fs');
const Discord = require("discord.js");

function compareResults(response, testName, writeResponseToFile, url, startTime, testCategoryPath) {
    var results = {
        "Name": testName,
        "Status": "",
        "Uri" : url,
        "Message": "",
        "Time": 0
        };

    var endTime = new Date()
    var szFilePath = `./ExpectedResults/${testCategoryPath}${testName}.json`;
    if (writeResponseToFile) {
        var szData = JSON.stringify(response.data, null, 4);
        fs.writeFileSync(szFilePath, szData);
    }

    var seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    var expectedResults = require("." + szFilePath);

    if (JSON.stringify(response.data) === JSON.stringify(expectedResults)) {
        results.Status = "Passed"
        results.Time = seconds;
    } else {
        results.Status = "Failed"
        results.Time = seconds;
        results.Message = "Test results did not match what was expected";
    };

    return results;
}

module.exports.compareResults = compareResults;

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
                { name: "Test Name: " + testResults[index].Name, value: "----------------------------------------------------------------", inline: false },
                { name: 'Status:', value: testResults[index].Status, inline: true },
                { name: 'Test Duration:', value: `${testResults[index].Time} sec`, inline: true }
            )

            if (testResults[index].Message != '') {
                testResultEmbed.addField({name: 'Message', value: testResults[index].Message, inline: false});
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
            { name: 'Status:', value: ((totalFailed = 0) ? 'Passed' : 'Failed'), inline: true },
            { name: 'Total Test Duration:', value: `${totalTime} sec`, inline: true },
            { name: "Total Tests: ", value: totalTests, inline: true}
        )

        message.channel.send(testResultEmbed);
    }
}

module.exports.sendTestResultsMessage = sendTestResultsMessage;
