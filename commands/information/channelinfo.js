const { MessageEmbed } = require("discord.js");
const moment = require("moment-timezone");
moment.locale('ko-KR');

module.exports = {
    name: "channelinfo",
    aliases: ["channel info", "채널정보", "채널 정보"],
    category: "information",
    run: async (client, message, args) => {
        let channel = message.guild.channels.cache.get(args.join(" "));

        if (!channel && message.mentions.channels) channel = message.mentions.channels.first();

        if (!channel && args.join(" ")) {
            channel = message.guild.channels.cache.find(channel => {
                return channel.name.toLowerCase().includes(args.join(" "));
            });
        }

        if (!channel) channel = message.channel;

        const embed = new MessageEmbed().setTitle(`${channel.name} 채널 정보`).setColor(0xffff00).setFooter(channel.guild.name, channel.guild.iconURL()).setTimestamp().addField('🆔 채널 ID', `**${channel.id}**`);

        if (channel.parent) embed.addField('카테고리', `**${channel.parent.name}**`)

        embed.addField('채널 주제', `${channel.topic || "**없음**"}`)
            .addField('채널 타입', `**${type[channel.type]}**`)
            .addField('🎂 채널 생성 시간', `**${moment(channel.createdAt).tz('Asia/seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분')}**`)

        message.channel.send(embed)
    }
}

const type = {
    'text': '텍스트 채널',
    'voice': '음성 채널',
    'news': '공지 채널',
    'store': '상점 채널'
};