const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "skip",
    aliases: ['스킵', 'tmzlq'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))
        
        if (!serverQueue.playing) serverQueue.playing = true;

        serverQueue.skip();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setTitle("스킵 완료!").setDescription(`✅ **[${serverQueue.songs[0].info.title}](${serverQueue.songs[0].info.uri})**이(가) 스킵되었습니다!`));
    }
};