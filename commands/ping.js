const Discord = require("discord.js");
module.exports.run = async (client, message) => {

  message.channel.send('Pinging...').then(sent => {
    return sent.edit(`Pong! Ping is ${Math.round(client.ws.ping)}ms`);
  });

}

 module.exports.help = {
        name: "ping", // Command name
        aliases: ['latency'], // Other words that activate the command
        class: "utility", // The section the command is under on the help menu
        usage: `*ping`, // A usage example of the command
        description: "Why are you even here, it's literally just a ping command.\nIt goes pong. It does a ping pong.", // A description of the command for when someone runs the help command on it 
        status: true, // Whether or not the command is enabled
        guildOnly: false, // Whether or not the command works outside of servers
        permLevel: 1, // (1 = users, 2 = manage_messages, 3 = moderator, 4 = administrator, 5 = server owner, 6 = bot owner)  
        subCommands: []
}