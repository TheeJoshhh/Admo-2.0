// Node Modules
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

// Create Client
const client = new Discord.Client();

// Bind some thinggys to client for global access to said thinggys
client.config = require('./config.json');
client.utils = require('./utils.js');
client.guildData = new Enmap({name: "guildData"});
client.guildUsers = new Enmap({name: "guildUserData"});
client.commands = new Discord.Collection();
global.antiSpamCache = {}

// Load Commands into cache
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
cmdFiles.forEach(file => {
    try {
        const f = require(`./commands/${file}`);
        client.commands.set(f.help.name, f);
        console.log(`Loaded ${f.help.name}`);
    } catch (e) { 
        console.log(`Error in command ${file}`, e.stack);
    }
});

// Load and bind events to event files in the event folder.
const evtFiles = fs.readdirSync("./events/").filter(file => file.endsWith('.js'));
evtFiles.forEach(file => {
    const evtName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(evtName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
});

process.on('unhandledRejection', console.log);

// Login to the bot user
client.login(client.config.token);