const { Command } = require('discord-akairo');

class EightBallCommand extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball'],
            category: 'Fun',
            args: [
                {
                    id: 'question',
                    type: 'string'
                }
            ],
        });

        this.name = '8ball'
        this.description = 'Magic 8-ball answers to \'yes\' or \'no\' questions'
        this.usage = '8ball <question>'
        this.example = '8ball Will I win the lottery?'
    }

    answer () {
        const response = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            "Don't count on it.",
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];

        var responseIndex = Math.floor(Math.random() * response.length) + 1;
        return response[responseIndex];
    }

    async exec(message){
        let output = this.client.util.embed()
            .setDescription(`**🎱 ${this.answer()}**`)
            .setTimestamp()
            .setFooter(`Req by: ${message.author.tag}`);

        return message.util.send(output);
    }
}

module.exports = EightBallCommand;