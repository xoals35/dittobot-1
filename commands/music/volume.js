const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "volume",
    aliases: ['vol', '볼륨', '사운드', '소리', 'setvolume', 'qhffba', 'tkdnsem'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))
        if (!args[0]) return message.channel.send(`현재 볼륨은 **\`${serverQueue.volume}%\`** 입니다!`);

        if (isNaN(args[0]) || args[0].includes('.') || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) return message.channel.send(new MessageEmbed().setDescription("❌ 1 ~ 100 까지의 자연수만 입력해 주세요!").setColor(0x00FF00));

        serverQueue.setVolume(parseInt(args[0].replace('%', '')));
        message.channel.send(`✅ 볼륨을 **\`${parseInt(args[0])}%\`**(으)로 변경했어요!`);
    }
};