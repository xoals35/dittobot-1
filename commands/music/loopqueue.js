const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "loopqueue",
    aliases: ["ㅣㅐㅐㅔ벼뎓", 'queuerepeat', "qrepeat", "repeatq", "repeatqueue", '대기열반복', 'eorldufqksqhr', '재생목록반복', 'wotodahrfhrqksqhr', 'loopqueue', 'queueloop', 'ㅣㅐㅐㅔ벼뎓', '벼뎌디ㅐㅐㅔ', '루프대기열', 'fnvmeorlduf'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))

        serverQueue.loop = !serverQueue.loop;
        message.channel.send(new MessageEmbed().setColor(0x00FF00).setDescription(`✅ ${serverQueue.loop ? "지금부터 대기열이 반복됩니다!" : "대기열 반복 중지!"}`));
    }
};