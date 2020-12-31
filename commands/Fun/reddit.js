const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class RedditCommand extends Command {
    constructor() {
        super('reddit', {
            aliases: ['reddit'],
            ratelimit: 2,
            cooldown: 4000,
            category: 'NSFW',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [{
                id: 'sub',
                type: 'string',
                prompt: {
                    start: 'What subreddit do you want to browse?',
                    optional: true
                },
                default: 'random',
                match: 'rest'
            }],
        });
        this.name = "reddit"
        this.description = "Get a random reddit image/gif"
        this.usage = "reddit"
        this.example = "reddit"
    }

    async exec(message, args) {
        if (!args.sub) {
            return;
        }

        let output = this.client.util.embed()
            .setTitle(`Subreddit - Loading... :satellite:`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();
        message.util.send(output);

        fetch('https://www.reddit.com/r/' + args.sub + '.json?limit=100').then((response) => {
            return response.json();
        }).then((response) => {
            if (response.error === 404) {
                output = this.client.util.embed()
                    .setTitle(`Invalid Subreddit`)
                    .setColor(`#f26666`)
                    .setDescription(`I couldn't find the subreddit that you are looking for.`)
                    .setTimestamp()
                    .setFooter(
                        `Req by: ${message.author.tag}`,
                        message.author.displayAvatarURL()
                    );
                return message.util.send(output);
            }

            if (response.data.dist === 0) {
                output = this.client.util.embed()
                    .setTitle(`Invalid Subreddit`)
                    .setColor(`#f26666`)
                    .setDescription(`I couldn't find the subreddit that you are looking for.`)
                    .setTimestamp()
                    .setFooter(
                        `Req by: ${message.author.tag}`,
                        message.author.displayAvatarURL()
                    );
                return message.util.send(output);
            }

            let i = Math.floor((Math.random() * response.data.children.length));
            //console.log(response.data.children[i].data.post_hint)
            if (response.data.children[i].data.over_18 == true && !message.channel.nsfw) {
                output = this.client.util.embed()
                    .setTitle(`NSFW`)
                    .setColor(`#f26666`)
                    .setDescription(`I am unable to send this content here. This channel is not an NSFW channel!`)
                    .setTimestamp()
                    .setFooter(
                        `Req by: ${message.author.tag}`,
                        message.author.displayAvatarURL()
                    );
                return message.util.send(output);
            }

            output = this.client.util.embed()
                .setColor('#FF5700')
                .setTitle(response.data.children[i].data.title)
                .setDescription(response.data.children[i].data.selftext)
                .setURL('https://reddit.com' + response.data.children[i].data.permalink)
                .setFooter(`/r/${response.data.children[i].data.subreddit} | ⬆ ${response.data.children[i].data.ups} 🗨 ${response.data.children[i].data.num_comments}`);

            message.util.send(output);
            message.util.sendNew(response.data.children[i].data.url)
        })
    }
}

module.exports = RedditCommand;