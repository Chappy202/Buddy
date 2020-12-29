const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'NTg4NzM1MzkxMTkzMTA0NDIy.XQJcjw.Kt6CHaNm4yeok5U7DKOWr1Yt9AM' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();