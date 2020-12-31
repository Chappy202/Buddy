const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const randomPuppy = require('random-puppy');

class GonewildNSFWCommand extends Command {
    constructor() {
        super('gonewild', {
            aliases: ['gonewild'],
            category: 'NSFW'
        });
        this.name = "gonewild"
        this.description = "Get a random gonewild image/gif"
        this.usage = "gonewild"
        this.example = "gonewild"
    }

    async exec(message) {
        let type = "GoneWild";
        if (!message.channel.nsfw) {
            return message.util.send(this.client.util.noNSFW(message));
        }

        let subreddits = [
            "GoneWild",
            "PetiteGoneWild",
            "GoneMild",
            "gifsgonewild",
            "AnalGW",
            "WeddingsGoneWild",
            "assholegonewild"
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

module.exports = GonewildNSFWCommand;