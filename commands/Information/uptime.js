const { Command } = require('discord-akairo');

class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime', 'active'],
            category: 'Information',
            channel: 'guild',
        });
        this.name = "uptime"
        this.description = "Shows how long Buddy has been awake for."
        this.usage = "uptime"
        this.example = "uptime"
    }

    async exec(message) {
        let msec = Number(process.uptime().toFixed(0))*1000;
        let totalSeconds = Math.floor(msec / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let output = this.client.util.embed()
            .setTitle(`I have been awake for`)
            .setDescription(`Days: \`${days}\` Hours: \`${hours}\` Minutes: \`${minutes}\` Seconds: \`${seconds}\``)
            .setTimestamp();
        return message.util.send(output);
    }
}

module.exports = UptimeCommand;