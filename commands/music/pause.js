const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pause",
    aliases: ['일시정지', 'ㅔ면ㄷ', 'dlftlwjdwl'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))

        if (!serverQueue.playing) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 이미 일시 정지되어 있어요!`))

        serverQueue.pause();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`⏸ 일시 정지되었습니다!`));
    }
};