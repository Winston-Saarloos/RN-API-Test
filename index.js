//const schedule = require('node-schedule');
const Discord = require("discord.js");

// Custom Classes
var recnet = require('./Classes/recnet');
var compareTestResults = require('./Classes/common');

const config = require('./Config/config.json');
const client = new Discord.Client();

// Batch up API calls into groups
//
// GET API CALLS
// GetImageInformationTest
async function getImageInformationTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImageInformation";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v4/${iImageId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetImageCommentsTest
async function getImageCommentsTest() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImageComments";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/comments`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetImageCommentsTest
async function getImageCheers() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImageCheers";
    var iImageId = 11137613;
    var szUrl = `https://api.rec.net/api/images/v1/${iImageId}/cheers`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetPlayerImageFeed
async function getPlayerImageFeed() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerImageFeed";
    var iPlayerId = 319444;
    // URL parameters 
    // ?take
    // ?skip
    // ?since
    var szUrl = `https://api.rec.net/api/images/v3/feed/player/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//GetPlayerImages
async function getPlayerImages() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getPlayerImages";
    var iPlayerId = 319444;
    // URL parameters 
    // ?take
    // ?skip
    // ?since
    var szUrl = `https://api.rec.net/api/images/v4/player/${iPlayerId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

//getImagesFromEvent
async function getImagesFromEvent() {
    // Parmeters
    var startTime = new Date()
    var szTestName = "getImagesFromEvent";
    var iEventId = 268367;
    var szUrl = `https://api.rec.net/api/images/v1/playerevent/${iEventId}`;

    // Act
    var response = await recnet.getData(szUrl);

    // Assert
    return compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
}

// Test functions
async function runTests() {
    try {
        console.log('=================================={[ GET (No Auth) ]}=====================================');
        var ImageResults = [];
        ImageResults.push(await getImageInformationTest())
        ImageResults.push(await getImageCommentsTest())
        ImageResults.push(await getPlayerImageFeed())
        ImageResults.push(await getImageCheers())
        ImageResults.push(await getPlayerImages())
        ImageResults.push(await getImagesFromEvent())
        
        console.log(ImageResults);
        console.log("All tests completed.");

    } catch (error) {
        console.log(error)
        // send message in Discord about the error that occurred
    }
};



// // GetImageInformationTest
// async function getImageInformationTest() {
//     // Parmeters
//     var startTime = new Date()
//     var szTestName = "getImageInformation";
//     var iImageId = 11137613;
//     var szUrl = `https://api.rec.net/api/images/v4/${iImageId}`;
//     var iTotalItemsInResponse = 0;
//     var iTotalItemsInResponseItem = 0;


//     // Act
//     var response = await recnet.getData(szUrl);

//     // Assert
//     compareTestResults.compareResults(response, szTestName, false, szUrl, startTime);
// }

// async function runSingleTest() {
//     await (getImageInformationTestTest())
// }

// runSingleTest();

// https://api.rec.net
// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

// Development Value
const DEVELOPMENT_MODE = true;
const sandboxChannel = 819809580178997269;
const Rocko = 109498008596398080;

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    client.user.setActivity("Rec Room");
  
    console.log("Project is now online!");
  });
  
  client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(quests[Math.floor(random)]);
  });
  
  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(quests[Math.floor(random)]);
  });

client.on("message", async message => {
    if (message.author.bot) return;

    if (DEVELOPMENT_MODE && message.author != Rocko) {
        return message.reply("Sorry, you don't have permissions to use this!");
    };

    if (DEVELOPMENT_MODE) {
        if (message.channel.id != sandboxChannel) return;
    }

    //console.log(message.author);

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    };

    if (command === "test") {
        message.channel.send('API Test Started..');
        await runTests(message);
    }
});

client.login(config.token);