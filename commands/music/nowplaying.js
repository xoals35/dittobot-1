const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "nowplaying",
    aliases: ['np', 'now-playing', 'nowplay', 'ㅜㅐ제ㅣ묘ㅑㅜㅎ', '현재음악', '현재곡', 'guswodmadkr', 'gusworhr', '지금곡', 'wlrmarhr', '지금음악', 'wlrmadmadkr', '지금노래', 'wlrmashfo', '현재노래', 'guswoshfo'],
    category: "music",
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 현재 재생 중인 음악이 없어요!`));
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor(0xFF0000).setDescription(`❌ 음성 채널에 먼저 들어가 주세요!`))

        const song = serverQueue.songs[0];
        message.channel.send(new MessageEmbed().setThumbnail(/*`https://img.youtube.com/vi/${song.identifier}/maxresdefault.jpg` || `https://i.ytimg.com/vi/${song.info.identifier}/maxresdefault.jpg` || */`https://img.youtube.com/vi/${song.identifier}/mqdefault.jpg`).setTitle(song.info.title).setURL(song.info.uri).setDescription(`${serverQueue.playing ? "🎶 재생 중" : "⏸ 일시 정지됨"}\nAuthor: **${song.info.author}**`).setColor(0x00FF00));
    }
};