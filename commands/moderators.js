const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

    function usage() { return message.channel.send(`Incorrect command usage, correct usage: \`${client.commands.get("moderators").help.usage}\``) }
    if (!args[0]) return usage();
    
    function find(input) {
        let result = null;
        result = message.guild.members.cache.find(m => m.user.id === input); // User by ID
        if (result) return {type: "member", id: result.id, name: result.user.tag};
        result = message.guild.roles.cache.find(r => r.id === input); // Role by ID
        if (result) return {type: "role", id: result.id, name: result.name};
        result = message.guild.members.cache.find(m => m.displayName.toLowerCase().startsWith(input)); // User by display name
        if (result) return {type: "member", id: result.id, name: result.user.tag};
        result = message.guild.members.cache.find(m => m.user.tag.toLowerCase().startsWith(input));
        if (result) return {type: "member", id: result.id, name: result.user.tag};
        result = message.guild.roles.cache.find(r => r.name.toLowerCase().startsWith(input));
        if (result) return {type: "role", id: result.id, name: result.name};
        result = message.mentions.members.first();
        if (result) return {type: "member", id: result.id, name: result.user.tag};
        return null;
    }

    let result;
    if (args[1]) result = find(args[1]);
    else result = find(args[0]);
    if (!result) return message.channel.send("No role or user could be found with that name or id. Please try again.")

    function addMod() {
        for(x in mods) if (mods[x].id === result.id) return message.channel.send(`That ${result.type} already has moderator permissions!`)
        client.guildData.push(message.guild.id, {type: result.type, id: result.id}, "modCommandPerms");
        return message.channel.send(`The ${result.type} \`${result.name}\` has been given moderator permissions.`);
    }

    function removeMod() {
        let newArray = [];
        mods.forEach(x => { if (x.id !== result.id) newArray.push(x) });
        console.log(`New array length: ${newArray.length}\nOld array length: ${mods.length}`)
        if (mods.length === newArray.length) return message.channel.send(`The ${result.type} \`${result.name}\` doesn't have moderator permissions, did you make a typo?`);
        client.guildData.set(message.guild.id, newArray, "modCommandPerms")
        return message.channel.send(`The ${result.type} \`${result.name}\` no longer has moderator permissions.`);
    }

    const mods = client.guildData.get(message.guild.id, "modCommandPerms");
    if (!args[1]) return addMod();
    else if (args[0] === "add") return addMod();
    else if (args[0] === "remove") return removeMod()
    else return usage();

}

module.exports.help = {
    name: "moderators", // Command name
    aliases: ['mods', 'mod'], // Other words that activate the command
    class: "moderation", // The section the command is under on the help menu
    usage: `moderators <add|remove> [*NameOfRoleOrUser]`, // A usage example of the command
    description: "Allows you to give a role or a user moderator permissions.", // A description of the command for when someone runs the help command on it 
    status: true, // Whether or not the command is enabled
    permLevel: 4, // (1 = users, 2 = manage_messages, 3 = moderator, 4 = administrator, 5 = server owner, 6 = bot owner)  
    subCommands: []
}