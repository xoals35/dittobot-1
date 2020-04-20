const Lyrics = require("slyrics");
const lyrics = new Lyrics();
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowlyrics',
    aliases: ['ㅜㅐ지ㅛ걏ㄴ'],
    category: "music",
    run: async (client, message, args, tools) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));

        const song = serverQueue.songs[0]

        let result = await lyrics.get('melon', song.info.title);
        if (!result) result = await lyrics.get('atozLyrics', song.info.title)

        if (result.error) return message.channel.send(`\`${song.info.title}\`의 가사를 찾을 수 없습니다.`);
        else {
            const embed = new MessageEmbed().setTitle(`${result.artist} - ${result.title}`).setThumbnail(result.albumArt).setColor(0xffff00);
            
            if (result.result.toString().length < 1700) {
                embed.setDescription(`[🎵 바로가기](${result.url})\n\n${result.result.toString()}`);
                message.author.send(embed);
            } else {
                embed.setDescription(`[🎵 바로가기](${result.url})\n\n${result.result.toString().substr(0, 1650)}`);
                message.author.send(embed);
                message.author.send(new MessageEmbed().setColor(0xffff00).setDescription(`${result.result.toString().replace(result.result.toString().substr(0, 1650), '')}`));
            };
        };
    }
};