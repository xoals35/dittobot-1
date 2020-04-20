const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "leave",
    aliases: ['ㅣㄷㅁㅍㄷ', 'stop', 'dc',"disconnect", '스탑', 'tmxkq', 'ㄴ새ㅔ', '멈춰', '정지', 'wjdwl', '나가', 'skrk', '꺼져'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))
        
        serverQueue.destroy();
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`✅ 모든 음악을 정지하였습니다!`));
    }
};