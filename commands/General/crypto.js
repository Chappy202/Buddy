const { Command } = require('discord-akairo');
// Require Coingecko api
const CoinGecko = require('coingecko-api');
// Initiate the CoinGecko api
const CoinGeckoClient = new CoinGecko();

class CryptoCommand extends Command {
    constructor() {
        super('crypto', {
            aliases: ['crypto', 'token', 'value', 'btc'],
            category: 'General',
            channel: 'guild',
            args: [{
                id: 'cryptArgOne',
                type: 'string',
                //default: 'bitcoin'
            }],
            ooldown: 5000,
        });
        this.name = "crypto"
        this.description = "Shows the current Crypto prices and API status of CoinGecko"
        this.usage = "crypto"
        this.example = "crypto"
    }

    async exec(message, args) {
        if (args.cryptArgOne === null) {
            let data = await CoinGeckoClient.simple.price({
                ids: ['bitcoin'],
                vs_currencies: ['usd', 'zar'],
            });
            let output = this.client.util.embed()
                .setColor('#f2a900')
                .setTitle(`No currency provided. Default: Bitcoin`)
                .setDescription(`**Bitcoin value in USD:** $${data.data.bitcoin.usd}
        **Bitcoin value in ZAR:** R${data.data.bitcoin.zar}`)
                .setTimestamp()
                .setFooter(`Req by: ${message.author.tag}`);

            return message.util.send(output);
        } else if (args.cryptArgOne === 'status' || args.cryptArgOne === 'api' || args.cryptArgOne === 'ping') {
            let ping = await CoinGeckoClient.ping();
            if (ping.success === true) {
                let output = this.client.util.embed()
                    .setColor('#66f266')
                    .setTitle(`The CoinGecko API is available`)
                    .setDescription(`Gecko Says: ${ping.data.gecko_says}`)
                    .setTimestamp()
                    .setFooter(`Req by: ${message.author.tag}`);
                return message.util.send(output);
            } else {
                return apiDown(message);
            }
        } else {
            let currency = args.cryptArgOne.toLowerCase();
            let data = await CoinGeckoClient.simple.price({
                ids: [currency],
                vs_currencies: ['usd', 'zar'],
            });
            if (data.success === true) {
                if (!(Object.keys(data.data).length === 0 && data.data.constructor === Object)) {
                    const output = this.client.util.embed()
                        .setColor('#6bcbd8')
                        .setTitle(`Value of ${upFirst(currency)}`)
                        .setDescription(`**${upFirst(currency)} value in USD:** $${data.data[currency].usd}
            **${upFirst(currency)} value in ZAR:** R${data.data[currency].zar}`)
                        .setTimestamp(Date())
                        .setFooter(`Req by: ${message.author.tag}`);

                    return message.util.send(output);
                } else {
                    const output = this.client.util.embed()
                        .setColor('#6bcbd8')
                        .setTitle(`Unknown Currency`)
                        .setDescription(`I couldn't find that currency! Make sure you spelled it right, and avoid using abbreviations such as 'BTC'`)
                        .setTimestamp(Date())
                        .setFooter(`Req by: ${message.author.tag}`);

                    return message.util.send(output);
                }
            } else {
                return apiDown(message);
            }
        }
    }
}

module.exports = CryptoCommand;

function apiDown(message) {
    let output = this.client.util.embed()
        .setColor('#f26666')
        .setTitle(`The CoinGecko API is un-available`)
        .setDescription(`Looks like the API is down. Check back again later.`)
        .setTimestamp()

    return message.util.send(output);
}