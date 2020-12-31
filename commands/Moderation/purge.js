const { Command } = require("discord-akairo");
const pluralize = require('pluralize');

class PurgeCommand extends Command {
    constructor() {
        super("purge", {
            aliases: ["purge", 'prune'],
            category: 'Moderation',
            args: [{
                id: 'count',
                type: 'number'
            }],
            cooldown: 5000,
            channelRestriction: 'guild',
            clientPermissions: ['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
            userPermissions: ['MANAGE_MESSAGES']
        })

        this.name = "purge"
        this.description = "Purges up to 100 messages in the channel it was sent in."
        this.usage = "purge [nummber]"
        this.example = "purge 50"
    }

    async exec(message, args) {
        const channel = message.channel;
        const count = args.count;
        const messageCount = pluralize('message', count, true);

        if (channel.type === 'dm') {
            let output = this.client.util.embed()
                .setColor('#f26666')
                .setDescription(`This command cannot be used in direct messages.`)
                .setTimestamp()

            return message.channel.send(output);
        }

        if (count > 100 || !count) {
            let output = this.client.util.embed()
                .setColor('#f26666')
                .setTitle(`Number invalid`)
                .setDescription(`You either didn't enter a number, or you entered a number larger than 100.`)
                .setTimestamp()

            return message.channel.send(output);
        }

        try {
            await message.channel.bulkDelete(count + 1, true);
            let deleting = this.client.util.embed()
                .setDescription(`Deleting ${messageCount}, please wait...`)
                .setTimestamp()
            let deleted = this.client.util.embed()
                .setDescription(`Deleted ${messageCount}.`)
                .setTimestamp()

            await message.channel.send(deleting).then((msg) => {
                msg.edit(deleted).then(res => res.delete(10000));
            });
        } catch (err) {
            let output = this.client.util.embed()
                .setColor('#f26666')
                .setTitle(`Failed to delete messages`)
                .setDescription(`I was unable to delete the messages`)
                .setTimestamp()
            this.client.logger.log('error', `Purge Error: ${err}`);
            return message.util.send(output);
        }
    }
}

module.exports = PurgeCommand;