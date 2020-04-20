const { MessageEmbed } = require("discord.js");
const Choose = ["✌", "✊", "✋"];

module.exports = {
    name: "rps",
    aliases: ["가위 바위 보", "가위바위보"],
    category: "command",
    run: async (client, message, args) => {
        let filter = (reaction, user) => (reaction.emoji.name === '✌' || reaction.emoji.name === '✊' || reaction.emoji.name === '✋') && user.id === message.author.id;

        const embed = new MessageEmbed().setColor(0xfffffe).setFooter(message.author.username, message.author.displayAvatarURL()).setTitle(`가위바위보`).setTimestamp();

        message.channel.send(embed).then(async (th) => {
            await th.react('✌');
            await th.react('✊');
            await th.react('✋');

            th.awaitReactions(filter, {
                max: 1
            }).then(async (collected) => {
                let choose = collected.array()[0].emoji.name;
                let bot = Choose[Math.floor(Math.random() * Choose.length)];
                let result = ``;

                if ((choose === "✊" && bot === "✌") || (choose === "✋" && bot === "✊") || (choose === "✌" && bot === "✋")) result = `이기셨습니다!`
                else if (choose === bot) result =  `비겼네요...`;
                else result = `지셨네요...`;

                if (message.guild.me.hasPermission("MANAGE_MESSAGES")) await th.reactions.removeAll();

                th.edit(embed.setTitle(result).setDescription(`**${choose} vs ${bot}**`));
            });
        });
    }
};