const { Command } = require('discord-akairo');

class GitHubCommand extends Command {
    constructor() {
        super('github', {
            aliases: ['github', 'ghub', 'gh'],
            category: 'Information',
            channel: 'guild',
        });
        this.name = "github"
        this.description = "Displays the Buddy GitHub Repository link"
        this.usage = "github"
        this.example = "github"
    }

    async exec(message) {
        let output = this.client.util.embed()
            .setColor('#9CDAF1')
            .setTitle(`GitHub Repository`)
            .setURL('https://github.com/Chappy202/Buddy')
            .setThumbnail('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
            .setDescription(`**You can find my GitHub repo here:** https://github.com/Chappy202/Buddy`)
            .setTimestamp()
            .setFooter('GitHub Repository', 'https://chappy202.com/buddy/images/face.png');

        return message.util.send(output);
    }
}

module.exports = GitHubCommand;