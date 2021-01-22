const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const nekos = require('nekos.life');
const { nsfw } = new nekos();


class HentaiNSFWCommand extends Command {
    constructor() {
        super('hentai', {
            aliases: ['hentai', 'h'],
            category: 'NSFW',
            args: [
                {
                    id: 'type',
                    type: 'string',
                    default: 'hentai'
                }
            ]
        });
        this.name = "hentai"
        this.description = "Get a random hentai image/gif"
        this.usage = "hentai ?"
        this.example = "hentai ?"
    }

    help(params, message) {
        let argument = new Discord.Collection();

        argument['Arguments'] = [];
        params.forEach(item => {
            argument['Arguments'].push(`\`${item}\``);
        });

        let output = new MessageEmbed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`Hentai Help`)
            .setDescription(`Get a random hentai image/gif`)
            .addField(`Usage:`, 'hentai `<argument>`\nReplace **<argument>** with any of the possible arguments.')
            .setFooter(
                `Req by: ${message.author.tag}`,
                message.author.displayAvatarURL()
            )
            .setTimestamp();
        for (let item in argument) {
            output.addField(`Arguments:`, argument[item].join(' - '));
        }

        return output;
    }

    output(media, msg, isDefault = false){
        if (!isDefault){
            const output = new MessageEmbed()
                .setColor('#eb6449')
                .setTitle(`Hentai`)
                .setImage(`${media.url}`)
                .setFooter(
                    `Req by: ${msg.author.tag}`,
                    msg.author.displayAvatarURL()
                )
                .setTimestamp();

            return output;
        } else {
            const output = new MessageEmbed()
                .setColor('#eb6449')
                .setTitle(`Hentai`)
                .setImage(`${media.url}`)
                .setFooter(
                    `You can use 'hentai help' for more specific hentai results.\nReq by: ${msg.author.tag}`,
                    msg.author.displayAvatarURL()
                )
                .setTimestamp();

            return output;
        }
    }

    async exec(message, args) {
        if (!message.channel.nsfw) {
            return message.util.send(this.client.util.noNSFW(message));
        }
        let params = [
            'hentai',
            'anal',
            'avatar',
            'bj',
            'blowjob',
            'boobs',
            'classic',
            'cumarts',
            'cumsluts',
            'ero',
            'erofeet',
            'erokemonomimi',
            'erokitsune',
            'eroneko',
            'eroyuri',
            'feet',
            'feetgif',
            'femdom',
            'futanari',
            'gasm',
            'girlsolo',
            'girlsologif',
            'holo',
            'eroholo',
            'keta',
            'kuni',
            'lesbian',
            'pussy',
            'pussyart',
            'spank',
            'tits',
            'trap',
            'kemonomimi',
            'kitsune',
            'neko',
            'nekogif',
            'randomgif',
            'yuri'
        ]

        let media;

        switch (args.type.toLowerCase()) {
            case 'help':
                return message.util.send(this.help(params, message));
            case '?':
                return message.util.send(this.help(params, message));
            case 'hentai':
                media = await nsfw.hentai();
                return message.util.send(this.output(media, message, true));
            case 'anal':
                media = await nsfw.anal();
                return message.util.send(this.output(media, message));
            case 'avatar':
                media = await nsfw.avatar();
                return message.util.send(this.output(media, message));
            case 'bj':
                media = await nsfw.bJ();
                return message.util.send(this.output(media, message));
            case 'blowjob':
                media = await nsfw.blowJob();
                return message.util.send(this.output(media, message));
            case 'boobs':
                media = await nsfw.boobs();
                return message.util.send(this.output(media, message));
            case 'classic':
                media = await nsfw.classic();
                return message.util.send(this.output(media, message));
            case 'cumarts':
                media = await nsfw.cumArts();
                return message.util.send(this.output(media, message));
            case 'cumsluts':
                media = await nsfw.cumsluts();
                return message.util.send(this.output(media, message));
            case 'ero':
                media = await nsfw.ero();
                return message.util.send(this.output(media, message));
            case 'erofeet':
                media = await nsfw.eroFeet();
                return message.util.send(this.output(media, message));
            case 'erokemonomimi':
                media = await nsfw.eroKemonomimi();
                return message.util.send(this.output(media, message));
            case 'erokitsune':
                media = await nsfw.eroKitsune();
                return message.util.send(this.output(media, message));
            case 'eroneko':
                media = await nsfw.eroNeko();
                return message.util.send(this.output(media, message));
            case 'eroyuri':
                media = await nsfw.eroYuri();
                return message.util.send(this.output(media, message));
            case 'feet':
                media = await nsfw.feet();
                return message.util.send(this.output(media, message));
            case 'feetgif':
                media = await nsfw.feetGif();
                return message.util.send(this.output(media, message));
            case 'femdom':
                media = await nsfw.femdom();
                return message.util.send(this.output(media, message));
            case 'futanari':
                media = await nsfw.futanari();
                return message.util.send(this.output(media, message));
            case 'gasm':
                media = await nsfw.gasm();
                return message.util.send(this.output(media, message));
            case 'girlsolo':
                media = await nsfw.girlSolo();
                return message.util.send(this.output(media, message));
            case 'girlsologif':
                media = await nsfw.girlSoloGif();
                return message.util.send(this.output(media, message));
            case 'holo':
                media = await nsfw.holo();
                return message.util.send(this.output(media, message));
            case 'eroholo':
                media = await nsfw.holoEro();
                return message.util.send(this.output(media, message));
            case 'keta':
                media = await nsfw.keta();
                return message.util.send(this.output(media, message));
            case 'kuni':
                media = await nsfw.kuni();
                return message.util.send(this.output(media, message));
            case 'lesbian':
                media = await nsfw.lesbian();
                return message.util.send(this.output(media, message));
            case 'pussy':
                media = await nsfw.pussy();
                return message.util.send(this.output(media, message));
            case 'pussyart':
                media = await nsfw.pussyArt();
                return message.util.send(this.output(media, message));
            case 'pussywankgif':
                media = await nsfw.pussyWankGif();
                return message.util.send(this.output(media, message));
            case 'spank':
                media = await nsfw.spank();
                return message.util.send(this.output(media, message));
            case 'tits':
                media = await nsfw.tits();
                return message.util.send(this.output(media, message));
            case 'trap':
                media = await nsfw.trap();
                return message.util.send(this.output(media, message));
            case 'kemonomimi':
                media = await nsfw.kemonomimi();
                return message.util.send(this.output(media, message));
            case 'kitsune':
                media = await nsfw.kitsune();
                return message.util.send(this.output(media, message));
            case 'neko':
                media = await nsfw.neko();
                return message.util.send(this.output(media, message));
            case 'nekogif':
                media = await nsfw.nekoGif();
                return message.util.send(this.output(media, message));
            case 'randomgif':
                media = await nsfw.randomHentaiGif();
                return message.util.send(this.output(media, message));
            case 'yuri':
                media = await nsfw.yuri();
                return message.util.send(this.output(media, message));
            default:
                media = await nsfw.hentai();
                console.log('default')
                return message.util.send(this.output(media, message, true));
        }
    }
}

module.exports = HentaiNSFWCommand;