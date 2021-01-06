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
            userPermissions: ['MANAGE_MESSAGES']
        })

        this.name = "soundboard"
        this.description = "Plays a sound. Use `soundboard help` for a list of possible sounds."
        this.usage = "soundboard [sound]"
        this.example = "soundboard jeff"
    }

    async displayHelp(message){
        const nsfw = util.getNSFW();
        const sfw = util.getSFW();
        const volumeWarning = util.getVolumeWarning();
        const normal = util.getNormal();

        const totalSounds = util.getAll().length;
        const col = new Discord.Collection();

        const embed = this.client.util.embed()
            .setTitle(`Soundbar Sounds`)
            .setDescription(`You can use \`sb help\` to view this list.\nThere are a total of **${totalSounds}** sounds.\nUse \`sb stop\` to stop playing the sound.`)
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
            dispatcher.on('start', () => {
                const output = this.client.util.embed()
                    .setTitle(`Playing ➤ ${sound}`)
                    .setFooter(`Req by: ${reqby.tag}`)
                    .setTimestamp()

                message.util.send(output);
            });

            dispatcher.on('error', (err) => {
                this.client.logger.log('error', `Soundboard error: ${err}`);
                const embed = this.client.util.embed()
                    .setTitle(`Something went wrong`)
                    .setColor(`#f26666`)
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

    async checkExist(item){
        const allSounds = util.getAll();
        allSounds.forEach(sound => {
            if (sound.name === item) {
                //console.log(`../../assets/soundboard/${sound.file}`);
                let check = fs.existsSync(path.join(__dirname, '../..', `assets/soundboard/${sound.file}`));
                if (check){
                    return true;
                }
            }
        });
    }

    async exec(message, args) {
        const input = args.input.toLowerCase();
        /*if (input === 'test'){
            if (this.checkExist('21')){
                console.log(true)
            } else {
                console.log(false)
            }
        }*/
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
                    .setColor('#f26666')
                    .setDescription(`Join a voice channel and try again.`)
                    .setTimestamp()
                return message.util.send(embed);
            }

            if (this.checkExist(input)){
                if (voice){
                    const connection = await voice.join();
                    this.playSound(input, message, connection, message.author);
                }

            } else {
                const embed = this.client.util.embed()
                    .setTitle(`Unable to find specified sound`)
                    .setColor(`#f26666`)
                    .setDescription(`I couldn't find the sound \`${args.input}\'\nMake sure you spelled it correctly!`)
                    .setTimestamp()
                return message.util.send(embed);
            }
        }
    }
}

module.exports = SoundboardCommand;