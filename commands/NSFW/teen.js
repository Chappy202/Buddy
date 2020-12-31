const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class TeenNSFWCommand extends Command {
    constructor() {
        super('teen', {
            aliases: ['teen'],
            category: 'NSFW'
        });
        this.name = "teen"
        this.description = "Get a random teen image/gif"
        this.usage = "teen"
        this.example = "teen"
    }

    async exec(message) {
        let type = "Teen";
        if (!message.channel.nsfw) {
            return message.util.send(this.client.util.noNSFW(message));
        }

        let subreddits = [
            "LegalTeens",
            "collegesluts",
            "adorableporn",
            "LegalTeensXXX",
            "Gonewild18",
            "18_19",
            "Just18",
            "FauxBait",
        ]
        let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        //console.log(sub)
        let output = new MessageEmbed()
            .setColor('#eb6449')
            .setTitle(`NSFW ${type} - Loading... :satellite:`)
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();
        message.util.send(output);
        fetch('https://www.reddit.com/r/' + sub + '.json?limit=100').then((response) => {
            return response.json();
        }).then((response) => {

            let i = Math.floor((Math.random() * response.data.children.length));
            //console.log(response.data.children[i].data.post_hint)
            if (response.data.children[i].data.post_hint == undefined){ //post_hint = link | image
                output = new MessageEmbed()
                    .setColor('#eb6449')
                    .setTitle(`NSFW ${type}`)
                    .setURL(`${response.data.children[i].data.url}`)
                    .setDescription(`/r/${sub}\n\n**Something went wrong while trying to load the image...**`)
                    .setFooter(
                        `Req by: ${message.author.tag}`,
                        message.author.displayAvatarURL()
                    )
                    .setTimestamp();

                return message.util.send(output);
            }

            if (response.data.children[i].data.post_hint == 'rich:video'){ //post_hint = link | image
                output = new MessageEmbed()
                    .setColor('#eb6449')
                    .setTitle(`NSFW ${type}`)
                    .setURL(`${response.data.children[i].data.url}`)
                    .setImage(`${response.data.children[i].data.thumbnail}`)
                    .setDescription(`/r/${sub}`)
                    .setFooter(
                        `Req by: ${message.author.tag}`,
                        message.author.displayAvatarURL()
                    )
                    .setTimestamp();

                message.util.send(output);
                return message.util.sendNew(`${response.data.children[i].data.url.replace("watch", "ifr")}`);
            }

            if (response.data.children[i].data.post_hint == 'link'){ //post_hint = link | image
                output = new MessageEmbed()
                    .setColor('#eb6449')
                    .setTitle(`NSFW ${type}`)
                    .setURL(`${response.data.children[i].data.url}`)
                    .setDescription(`/r/${sub}`)
                    .setImage(`${response.data.children[i].data.thumbnail}`)
                    .setFooter(
                        `Req by: ${message.author.tag}`,
                        message.author.displayAvatarURL()
                    )
                    .setTimestamp();

                message.util.send(output);
                return message.util.sendNew(`${response.data.children[i].data.url}`);
            }
            // console.log(response.data.children[i].data) // url_overridden_by_dest | url

            output = new MessageEmbed()
                .setColor('#eb6449')
                .setTitle(`NSFW ${type}`)
                .setURL(`${response.data.children[i].data.url}`)
                .setDescription(`/r/${sub}`)
                .setImage(`${response.data.children[i].data.url}`)
                .setFooter(
                    `Req by: ${message.author.tag}`,
                    message.author.displayAvatarURL()
                )
                .setTimestamp();

            return message.util.send(output);
        })
    }
}

module.exports = TeenNSFWCommand;