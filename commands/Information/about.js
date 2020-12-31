const { Command } = require('discord-akairo');

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about', 'buddy'],
            category: 'Information',
            channel: 'guild',
        });
        this.name = "about"
        this.description = "Shows Information about Buddy"
        this.usage = "about"
        this.example = "about"
    }

    async exec(message) {
        let output = this.client.util.embed()
            .setColor('#9CDAF1')
            .setTitle(`About Buddy`)
            .setURL('https://github.com/Chappy202/Buddy')
            .setThumbnail('https://chappy202.com/bobby-project/images/avatar.png')
            .setDescription([`Buddy is developed by **@Chappy🎄#3353**`
                ,''
                ,`Buddy uses the **[Discord.js](https://discord.js.org)** library and the **[Akairo](https://discord-akairo.github.io/#/)** framework.`
                ,`You can find the Github repo for Bobby **[here](https://github.com/Chappy202/Buddy)**.`
                ,``
                ,`Use \`help\` for more info.`])
            .setTimestamp()
            .setFooter('Your friendly Discord helper.', 'https://chappy202.com/bobby-project/images/avatar.png');

        return message.util.send(output);
    }
}

module.exports = AboutCommand;