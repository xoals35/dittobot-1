const { ShardingManager } = require('discord.js');
require("dotenv").config();

const manager = new ShardingManager('./bot.js');

manager.spawn();
manager.on('shardCreate', shard => console.log(`Create shard ${shard.id}`));