//const schedule = require('node-schedule');
const Discord = require("discord.js");

const config = require('./Config/config.json');
const client = new Discord.Client();

// Test Functions
var images = require('./Tests/NoAuth/getImageInformationTests.js');
var account = require('./Tests/NoAuth/getAccountTests.js');
var imagesBulk = require('./Tests/NoAuth/postBulkImageInformationTests.js');

// Development Value
const DEVELOPMENT_MODE = true;
const sandboxChannel = 819809580178997269n;
const Rocko = 109498008596398080n;

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

    if (DEVELOPMENT_MODE) {
        if (message.channel.id != sandboxChannel) return;
    }

    if (DEVELOPMENT_MODE && message.author != Rocko) {
        return message.reply("Sorry, you don't have permissions to use this!");
    };

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
        var bSendAdvancedResults = ((args[0] == "1") ? true : false);

        await images.getImageInformationTests(message, bSendAdvancedResults);
        await account.getAccountTests(message, bSendAdvancedResults);

        //await imagesBulk.postImageInformationTests(message, bSendAdvancedResults);

        message.channel.send('API Tests Completed');
    }
});

client.login(config.token);