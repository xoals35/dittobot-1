const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "docs",
    aliases: ["닥스", "독스", "앷ㄴ"],
    category: "crawling",
    run: async (client, message, args) => {
        if (!args.join(' ')) return;

        const get = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json&q=${encodeURI(args.join(" "))}`).then(res => res.json());
        
        try {
            message.channel.send(new MessageEmbed(get));
        } catch (e) {
            message.channel.send(new MessageEmbed().setTitle('Error').setColor(0xff0000).setDescription(e));
        };
    }
};