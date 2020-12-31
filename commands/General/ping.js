const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'latency'],
            category: 'General'
        });
        this.name = "ping"
        this.description = "Get the bot latency"
        this.usage = "ping"
        this.example = "ping"
    }

    async exec(message) {
        let output = new MessageEmbed()
            .setColor(process.env.BASECOLOR)
            .setDescription(`🛰️ Pinging...`)
            .setTimestamp();

        const m = await message.util.send(output)
        const ping = Math.round(m.createdTimestamp - message.createdTimestamp);

        output = new MessageEmbed()
            .setColor(process.env.BASECOLOR)
            .setTitle(`🏓 Pong!`)
            .setDescription(`🔂 **RTT**: ${ping} ms
                💟 **Heartbeat - API**: ${Math.round(this.client.ws.ping)} ms`)
            .setTimestamp();

        return message.util.send(output);
    }
}

module.exports = PingCommand;