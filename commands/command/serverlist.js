const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverlist",
    aliases: ["서버 목록", "서버목록", "서버 리스트", "서버리스트"],
    category: "command",
    run: async (client, message, args) => {
        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 서버 리스트 (${client.guilds.cache.size}개의 서버)`).setColor(0xffff00).setFooter(client.user.username, client.user.displayAvatarURL()).setTimestamp().setDescription(client.guilds.cache.map(e => `**${e.name} - ${e.memberCount}명 | \`${e.owner.user.tag}\`**`).join('\n')));
    }
};