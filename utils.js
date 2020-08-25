module.exports = {

    "getData": (client, message) => {
        const ms = require("ms") // Require the module I use to convert time measurements into milliseconds 
        client.guildData.ensure(message.guild.id, { // Ensure the guild in which "message" was sent has existing data or apply the following default data.
            prefix: client.config.prefix, // This will allow servers to change their servers prefix.
            disabledChannels: [], // The bot will ignore all channels with their ID in this array.
            modCommandPerms: [],  // Which roles, users or perms have access to moderator commands. By default kick and prune needs MANAGE_MESSAGES and ban needs ADMINISTRATOR.
            embedColour: "#e91e63",  // The embeds will always be this colour, admins can configure it.
            warnsBeforeKick: 5, // Active warnings a user can obtain before being kicked
            warnsBeforeBan: 10, // Active warnings a user can obtain before being banned
            warnActiveTime: 604800000, // How long warnings are active for (1 week by default)
            antiswear: {enabled: false, defaultPunishment: "warning", defaultPunishmentSettings: {amount: 1, reason: "Using a blacklisted word."}}, // AntiSwear Status
            swearwords: [],
            antispam: {enabled: false, messageWarningsUntilPunish: 3, messageWarnsActiveTime: ms("6h"), maxMentions: 10, punishment: "mute", punishmentSettings: {time: ms("10m"), reason: "Continuing to Spam Despite Warnings"}},
            lastAutoSetupMute: null, // Used to prevent API spam because when mute is auto-setup it changes settings for every channel in the server.
            autoModIgnore: [], // The ID's of channels people or roles that AutoMod ignores aka anti-swear, anti-link and anti-spam
            muteRole: "", // Just the ID of the mute role
            muteRoleAuto: false, // Whether or not the mute role auto configures itself aka when a new channel is created the bot changes the mute roles permissions in that channel.
            antilink: false, // AllLinks, true or false (AllLinks = ban all links, true = ban specific links, false = off)
            links: [], // Links that are part of anti-link
            logs: {enabled: false, channel: ""}, // Whether or not logs are enabled and the channel of which mute is in
            autoRole: {enabled: false, role: ""} // Whether or not users are given a role when they join and if so which role.
        });
        return client.guildData.get(message.guild.id);
    },

    "checkMod": (client, message) => {
        const data = client.utils.getData(client, message); // Get the guilds data.
        for (x in data.modCommandPerms) if (data.modCommandPerms[x].id === message.author.id) return true;
        message.member.roles.cache.forEach(role => {
            for (x in data.modCommandPerms) {
                if (data.modCommandPerms[x].id === role.id) return true;
            }  
        });
        return false;
        
    },

}