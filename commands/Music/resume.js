const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
    constructor() {
        super('resume', {
            aliases: ['resume'],
            category: 'Music',
            clientPermissions: ["SPEAK", "CONNECT"],
            guildOnly: true,
        });
        this.name = "resume"
        this.description = "Resume the current paused song."
        this.usage = "resume"
        this.example = "resume"
    }

    async exec(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.util.send(this.client.util.emptyVoiceChannel());
        }

        let song = await this.client.player.resume(message.guild.id);
        song = song.song;
        if (song) {
            let embed = this.client.util.embed()
                .setTitle(`Resumed: ${song.name}`)
                .setDescription(`Song resumed :arrow_forward:`)
                .setTimestamp(Date())
                .setFooter(`Req by: ${message.author.tag}`);
            return message.util.send(embed);
        } else {
            let embed = this.client.util.embed()
                .setAuthor(`${message.guild.name} Current song`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There is currently no song playing.`)
                .setTimestamp()
            return message.util.send(embed);
        }
    }
}

module.exports = ResumeCommand;