const { version, MessageEmbed } = require("discord.js");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "botinfo",
    aliases: ["봇정보"],
    category: "botinfo",
    run: async (client, message, args, ops) => {
        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 정보`).setColor(0x00ff00).setThumbnail(client.user.displayAvatarURL()).setDescription(`봇 이름: **${client.user.username}**\n🆔 봇 ID: **${client.user.id}**\n🎂 봇 생일: **${moment(client.user.createdAt).tz('Asia/seoul').format('YYYY년 MM월 DD일')}**\n개발자: **${client.users.cache.get(ops.ownerID).tag}**\n\n개발 언어: **JavaScript** | ${client.emojis.cache.get('687658915193683987')}\nNode.js: **${process.version}** | ${client.emojis.cache.get('687658724554309681')}\nDiscord.js: **${version}** | ${client.emojis.cache.get('689439626896736270')}\n\nPLATFORM: **${process.platform}**\nARCH: **${process.arch}**\nCPU: **${require("os").cpus()[0].model}**`));
    }
};