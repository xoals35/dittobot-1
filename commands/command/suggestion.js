const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggestion",
    aliases: ["건의", "rjsdml", "녛ㅎㄷㄴ샤ㅐㅜ"],
    category: "command",
    run: async (client, message, args, ops) => {
        if (!args[0]) return message.channel.send('건의할 내용을 입력해 주세요.');

        client.users.cache.get(ops.ownerID).send(new MessageEmbed().setTitle(`건의가 들어왔습니다.`).setColor("RANDOM").setFooter(message.author.username, message.author.displayAvatarURL()).setDescription(args.join(" ")).setTimestamp());
    }
};