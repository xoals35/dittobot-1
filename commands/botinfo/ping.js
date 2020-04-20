const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["핑", "ㅔㅑㅜㅎ", "vld"],
    category: "botinfo",
    run: async (client, message, args) => {
        const m = await message.channel.send(`🏓 **Pinging...**`);
        m.edit('', new MessageEmbed().setTitle(`🏓 **Pong!**`).setColor(0xffff00).setFooter(message.author.username, message.author.displayAvatarURL()).setTimestamp().setDescription(`**Discord API Latency**\n${client.ws.ping}ms\n\n**Latency**\n${m.createdAt - message.createdAt}ms`));
    }
};