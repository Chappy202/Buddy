const { Command } = require('discord-akairo');
const ms = require('ms');

class GiveawayCommand extends Command {
    constructor() {
        super('giveaway', {
            aliases: ['giveaway', 'g'],
            category: 'General',
            args: [
                {
                    id: 'arg',
                    type: 'string',
                    default: 'create'
                },
                {
                    id: 'time-id',
                    type: 'string',
                    default: '1d'
                },
                {
                    id: 'winners',
                    type: 'number',
                    default: 1
                },
                {
                    id: 'prize',
                    type: 'string',
                    default: 'Nothing'
                }
            ],
            channel: 'guild'
        });
        this.name = "giveaway"
        this.description = "Manage Giveaways"
        this.usage = "giveaway"
        this.example = "giveaway"
    }

    async exec(message, args) {
        if (args.arg.toLowerCase() === 'create') {
            this.client.giveaway.start(message.channel, {
                time: ms(args.time-id),
                prize: args.prize,
                winnerCount: parseInt(args.winners)
            }).then((gData) => {
                console.log(gData);
            });
        }

    }
}

module.exports = GiveawayCommand;