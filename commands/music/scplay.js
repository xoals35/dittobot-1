const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "scplay",
    aliases: ['사운드클라우드', '사클', 'tkzmf', 'sc', 'tkdnsemzmffkdnem', 'soundcloud', 'ㄴ치묘', '내ㅕㅜㅇ치ㅐㅕㅇ', 'soundcloudplay', '내ㅕㅜㅇ치ㅐㅕ에ㅣ묘'],
    category: 'music',
    run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("CONNECT")) return message.channel.send(new MessageEmbed().setDescription('❌ 음성 채널에 들어갈 수 있는 권한이 필요해요! (CONNECT 권한)').setColor(0xFF0000))
        if (!message.guild.me.hasPermission("SPEAK")) return message.channel.send(new MessageEmbed().setDescription('❌ 음성 채널에서 말할 수 있는 권한이 필요해요! (SPEAK 권한)').setColor(0xFF0000))
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))
        if (!args.join(" ")) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 재생할 노래의 이름 또는 URL을 입력해 주세요!`))

        const song = await client.musicManager.getSongs(`scsearch: ${args.join(" ")}`);
        if (!song[0]) return message.channel.send(new MessageEmbed().setDescription(`❌ **${args.join(' ')}**(이)라는 노래를 못 찾을 수 없어요...`).setColor(0xFF0000));

        client.musicManager.handleVideo(message, message.member.voice.channel, song[0]);
    }
};