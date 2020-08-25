const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

    function clean (text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
    
        try {
          const code = args.join(" ");
          if (code.indexOf("client.config") > -1 || code.indexOf("config.json") > -1 || code.indexOf("client.config.token") > -1 || code.indexOf("fs") > -1) return message.channel.send("Sorry, that information is restricted.")
          let evaled = eval(code);
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          if (evaled.indexOf(client.config.prefix) > -1) return message.channel.send("Sorry, this eval contains restricted information.")
          return message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    

  module.exports.help = {
    name: "eval", // Command name
    aliases: ['e'], // Other words that activate the command
    class: "utility", // The section the command is under on the help menu
    usage: `*eval [code]`, // A usage example of the command
    description: "Test some code.", // A description of the command for when someone runs the help command on it 
    status: true, // Whether or not the command is enabled
    permLevel: 6, // (1 = users, 2 = manage_messages, 3 = moderator, 4 = administrator, 5 = server owner, 6 = bot owner)  
    subCommands: []
    }
