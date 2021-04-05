var fs = require('fs');
const Discord = require("discord.js");

function compareResults(response, testName, writeResponseToFile, url, startTime, message) {
    var endTime = new Date()
    var szFilePath = "./ExpectedResults/" + testName + ".json";
    if (writeResponseToFile) {
        var szData = JSON.stringify(response.data, null, 4);
        fs.writeFileSync(szFilePath, szData);
    }

    var seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    var expectedResults = require("." + szFilePath);
    const testMessage = new Discord.MessageEmbed() 
    .setTitle(testName)
    .setDescription(url)

    if (JSON.stringify(response.data) === JSON.stringify(expectedResults)) {
        //console.log(`[${seconds} sec] ${testName} test passed.  [${url}]`);
        //message.channel.send(`[${seconds} sec] ${testName} test passed.  [${url}]`)
        testMessage.setColor('#00c410');
        testMessage.addField('Test Status', 'Passed', true);
        testMessage.addField('Time Taken', `${seconds} sec`, true);
    } else {
        //console.log(`[${seconds} sec] ${testName} test results did not match what was expected.  [${url}]`);
        //message.channel.send(`[${seconds} sec] ${testName} test results did not match what was expected.  [${url}]`)
        testMessage.setColor('#c90202')
        testMessage.addField('Test Status', 'Failed', true)
        testMessage.addField('Time Taken', `${seconds} sec`, true);
        testMessage.addField('Error Message', "Test results did not match what was expected", false);
    };

    message.channel.send(testMessage);
}

module.exports.compareResults = compareResults;