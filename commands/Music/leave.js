const { Command } = require('discord-akairo');

class LeaveCommand extends Command {
    constructor() {
        super('leave', {
            aliases: ['leave', 'fuckoff', 'foff', 'ff', 'bye'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true
        });
        this.name = "leave"
        this.description = "Leave the current voice channel"
        this.usage = "leave"
        this.example = "leave"
    }

    async exec(message) {
        this.client.player.stop(message.guild.id);
        let embed = this.client.util.embed()
            .setTitle(`Looks like I'm no longer wanted...`)
            .setDescription(`Stopped the music and cleared the queue. Bye!`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`)
        return message.util.send(embed);
    }
}

module.exports = LeaveCommand;