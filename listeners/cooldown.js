const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message, command, remaining) {

        let output = new MessageEmbed()
            .setColor(process.env.ERRORCOLOR)
            .setTitle(`Command on cooldown!`)
            .setDescription(`You have to wait \`${this.client.util.millisToDuration(remaining)}\` before you can use \`${command}\` again!`)
            .setTimestamp()

        return message.util.send(output);
    }
}