const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["말해"],
    category: "command",
    run: async (client, message, args) => {
        if (!args[0]) return;
        if (message.deletable) message.delete();

        if (args[0] === "임베드") message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`${args.slice(1).join(" ")}\n${message.author.username}님의 메세지`).setTimestamp().setFooter(client.user.username, client.user.displayAvatarURL()));
        else if (args[0] === "익명") message.channel.send(`${args.slice(1).join(" ")}`);
        else message.channel.send(`${args.join(" ")}\n${message.author.username}님의 메세지`);
    }
}