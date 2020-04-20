const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "queue",
    aliases: ['que', '재생목록', 'wotodahrfhr', '벼뎓', '대기열', 'eorlduf'],
    category: 'music',
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));

        let i = 0

        message.channel.send(new MessageEmbed().setColor(0x00FF00).setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**현재 재생 중인 곡**\n[${serverQueue.songs[0].info.title}](${serverQueue.songs[0].info.uri})\n\n**대기열**\n${serverQueue.songs[1] ? `${serverQueue.songs.map((songs) => `**${i++}.** [${songs.info.title}](${songs.info.uri})`).splice(1, 10).join("\n")}${serverQueue.songs.length > 10 ? `\n\n${serverQueue.songs.length - 10} more...` : ""}` : "없음"}`))
    }
};