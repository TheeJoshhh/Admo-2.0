module.exports = (client, message) => {

    let prefix = '';
    if (message.guild) {
        const guildSettings = client.utils.ensureGuildData(client, message.guild.id); // If the guild data doesn't exist, call a function to create it.
        prefix = guildSettings.prefix; // Get the guilds prefix.
    } else prefix = client.config.prefix;

    if (message.author.bot) return; // If the user sending the message is a bot ignore it.
    if (!message.content.startsWith(prefix)) return; // Ignore messages that don't have the prefix.

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command)
      || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(command));

    cmd.run(client, message);

}