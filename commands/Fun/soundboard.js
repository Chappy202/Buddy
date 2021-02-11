const { Command } = require("discord-akairo");
const util = require('../../core/SoundBoardHandler.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

class SoundboardCommand extends Command {
    constructor() {
        super("soundboard", {
            aliases: ["soundboard", 'sb'],
            category: 'Fun',
            args: [{
                id: 'input',
                type: 'string'
            }],
            cooldown: 3000,
            channelRestriction: 'guild',
            clientPermissions: ['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
        })

        this.name = "soundboard"
        this.description = "Plays a sound. Use `soundboard help` for a list of possible sounds."
        this.usage = "soundboard [sound|help|stop]"
        this.example = "soundboard jeff"
    }

    async displayHelp(message){
        const nsfw = util.getNSFW();
        //const sfw = util.getSFW();
        const volumeWarning = util.getVolumeWarning();
        const normal = util.getNormal();

        const totalSounds = util.getAll().length;
        const col = new Discord.Collection();

        const embed = this.client.util.embed()
            .setTitle(`Soundboard Sounds`)
            .setDescription(`You can use \`-sb help\` to view this list.\nThere are a total of **${totalSounds}** sounds.\nUse \`-sb stop\` to stop playing the sound.`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        col['normal'] = [];
        normal.forEach(sound => {
            if (!this.checkExist(sound.name)) return;
            let name = sound.name;
            col['normal'].push(`\`${name}\``);
        });
        col['nsfw'] = [];
        nsfw.forEach(sound => {
            if (!this.checkExist(sound.name)) return;
            let name = sound.name;
            col['nsfw'].push(`\`${name}\``);
        });
        col['earrape'] = [];
        volumeWarning.forEach(sound => {
            if (!this.checkExist(sound.name)) return;
            let name = sound.name;
            col['earrape'].push(`\`${name}\``);
        });

        for (let category in col){
            embed.addField(`${this.client.util.capatalizeFirst(category)}`, col[category].join(' - '));
        }

        return message.util.send(embed);
    }

    async playSound(sound, message, connection, reqby){
        // Play the specified sound from the mp3 file
        const allSounds = util.getAll();
        let soundFile;
        let soundItem;
        allSounds.forEach(item => {
            if (item.name === sound) {
                //console.log(`../../assets/soundboard/${sound.file}`);
                let check = fs.existsSync(path.join(__dirname, '../..', `assets/soundboard/${item.file}`));
                if (check){
                    soundFile = path.join(__dirname, '../..', `assets/soundboard/${item.file}`);
                    soundItem = item;
                }
            }
        });
        if (soundFile && soundItem) {
            const dispatcher = connection.play(soundFile, { volume: soundItem.volume/100 });
            connection.voice.setSelfDeaf(true);
            dispatcher.on('start', () => {
                const output = this.client.util.embed()
                    .setTitle(`Soundboard`)
                    .setDescription(`Playing **${sound}**\n*Use \`sb stop\` to stop playing.*`)
                    .setFooter(`Req by: ${reqby.tag}`)
                    .setTimestamp()

                message.util.send(output);
            });

            dispatcher.on('error', (err) => {
                this.client.logger.log('error', `Soundboard error: ${err}`);
                const embed = this.client.util.embed()
                    .setTitle(`Something went wrong`)
                    .setColor(process.env.ERRORCOLOR)
                    .setDescription(`Something went wrong while trying to play ${sound}`)
                    .setTimestamp()
                message.util.send(embed);
            });

            dispatcher.on('finish', () => {
                setTimeout(() => { dispatcher.destroy(); }, 2000);
                connection.disconnect();
            });
        }

    }

    checkExist(item){
        const allSounds = util.getAll();
        let exist = false;
        allSounds.forEach(sound => {
            if (sound.name === item) {
                //console.log(`../../assets/soundboard/${sound.file}`);
                let check = fs.existsSync(path.join(__dirname, '../..', `assets/soundboard/${sound.file}`));
                if (check){
                    exist = true;
                }
            }
        });
        return exist;
    }

    async exec(message, args) {
        if (args.input){
            const input = args.input.toLowerCase();
            const queue = this.client.player.getQueue(message);
            const voice = message.member.voice.channel;
            if (input === 'help' || input === 'h' || input === '?' || input === 'sounds' || !args.input){
                this.displayHelp(message);
            } else if(input === 'stop' || input === 'end' || input === 'leave') {
                const output = this.client.util.embed()
                    .setTitle(`Stopped playing Soundboard sound`)
                    .setDescription(`Left channel`)
                    .setFooter(`Req by: ${message.author.tag}`)
                    .setTimestamp()

                await message.util.send(output);
                voice.leave();
            } else {
                if (!voice) {
                    const embed = this.client.util.embed()
                        .setTitle(`No user found in voice channel`)
                        .setColor(process.env.ERRORCOLOR)
                        .setDescription(`Join a voice channel and try again.`)
                        .setTimestamp()
                    return message.util.send(embed);
                }

                if (queue) {
                    const embed = this.client.util.embed()
                        .setTitle(`Song Playing`)
                        .setColor(process.env.ERRORCOLOR)
                        .setDescription(`You can't play soundboard sounds while music is playing.`)
                        .setTimestamp()
                    return message.util.send(embed);
                }

                if (this.checkExist(input)){
                    //console.log(this.checkExist(input))
                    if (voice){
                        const connection = await voice.join();
                        this.playSound(input, message, connection, message.author);
                    }

                } else {
                    const embed = this.client.util.embed()
                        .setTitle(`Unable to find specified sound`)
                        .setColor(process.env.ERRORCOLOR)
                        .setDescription(`I couldn't find the sound \`${args.input}\`\nMake sure you spelled it correctly!`)
                        .setTimestamp()
                    return message.util.send(embed);
                }
            }
        } else {
            const output = this.client.util.embed()
                .setTitle(`Soundboard`)
                .setDescription(`To get a list of all possible sounds, use \`sb help\`\nTo run the specific sound, use \`sb <sound>\` and replace '<sound>' with the sound name from the help command.`)
                .setFooter(`Req by: ${message.author.tag}`)
                .setTimestamp()

            return message.util.send(output);
        }
    }
}

module.exports = SoundboardCommand;