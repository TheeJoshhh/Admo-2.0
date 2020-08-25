module.exports = (client, message) => {

  if (!message.guild) return; // If the message isn't in a server ignore it.

  let prefix = '';
  const guildSettings = client.utils.getData(client, message); // If the guild data doesn't exist, call a function to create it.
  prefix = guildSettings.prefix; // Get the guilds prefix.

  if (message.author.bot) return; // If the user sending the message is a bot ignore it.
  if (!message.content.startsWith(prefix)) return; // Ignore messages that don't have the prefix.

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command)
    || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(command));

  if (!cmd) return;

  const permLvlReq = cmd.help.permLevel;
  if (permLvlReq === 6 && client.config.owners.includes(message.author.id)) return cmd.run(client, message, args);
  let permLvl = 1;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permLvl = 2;
  if (client.utils.checkMod(client, message)) permLvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permLvl = 4;
  if (message.member.id === message.guild.owner.id) permLvl = 5;

  console.log(permLvl)
  if (permLvl < permLvlReq) return message.channel.send("You don't have enough permissions to use that command sorry.");
  
  return cmd.run(client, message, args);

}