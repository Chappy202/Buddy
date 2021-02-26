const { Command } = require('discord-akairo');

class IconCommand extends Command {
    constructor() {
        super('icon', {
            aliases: ['icon', 'servericon', 'sicon'],
            category: 'Information',
            channel: 'guild',
        });
        this.name = "icon"
        this.description = "Get the guild's icon"
        this.usage = "icon"
        this.example = "icon"
    }

    async exec(message) {
        let serverIcon = message.guild.iconURL();

        let output = this.client.util.embed()
            .setColor('#9CDAF1')
            .setTitle(`${message.guild.name}'s Icon`)
            .setImage(serverIcon)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        return message.util.send(output);
    }
}

module.exports = IconCommand;