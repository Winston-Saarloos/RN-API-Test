const schedule = require('node-schedule');
const Discord = require("discord.js");

const config = require('./Config/config.json');
const recnet = require("./Classes/recnet");
const client = new Discord.Client();

// Test Functions
var images = require('./Tests/NoAuth/getImageInfoTests.js');
var account = require('./Tests/NoAuth/getAccountInfoTests.js');
var rooms = require('./Tests/NoAuth/getRoomInfoTests.js');
//var imagesBulk = require('./Tests/NoAuth/postBulkImageInfoTests.js');

// Development Value
const DEVELOPMENT_MODE = config.developmentMode;
const sandboxChannel = config.sandboxChannel;
var botNotificationChannel = config.generalNotificationChannel;
const Rocko = config.rocko;

if (DEVELOPMENT_MODE) {
  botNotificationChannel = sandboxChannel;
}

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

// Scheduling Related Function
async function runTests(args) {
  client.channels.cache.get(botNotificationChannel).send('API tests started...');
  var bSendDetailedResult = false;
  if (args !== "undefined" || args !== null) {
    if ((args.length >= 1) && (args[0] == "1")) {
      bSendDetailedResult = true;
    }
  }
  await images.getImageInfoTests(bSendDetailedResult, client);
  await account.getAccountInfoTests(bSendDetailedResult, client);
  await rooms.getRoomInfoTests(bSendDetailedResult, client);

  //await imagesBulk.postImageInformationTests(message, bSendDetailedResult);

  client.channels.cache.get(botNotificationChannel).send(`API Tests Completed for date: ${new Date()}`);
}

// Runs at hour 0 every day
const jobHour0 = schedule.scheduleJob('0 0 * * *', function () { // '* 0 0 * *' Every day at hour 0
  runTests([""]);
});

// Runs at hour 12 every day
const jobHour12 = schedule.scheduleJob('0 12 * * *', function () { // '* 0 12 * *' Every day at hour 12
  runTests([""]);
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

  if (command === "t") {
    runTests(args);
  }

  if (command === "l") {
    var token = await recnet.getBearerToken();
    console.log(token);
  }
});

client.login(config.token);