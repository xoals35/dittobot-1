const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "hangang",
    aliases: ["한강온도", "한강수온", "한강"],
    category: 'crawling',
    run: async (client, message, args) => {
        const { temp, time } = await require('node-fetch')('http://hangang.dkserver.wo.tc/').then(res => res.json());

        message.channel.send(new MessageEmbed().setTitle('한강의 수온').setColor(0x00ffff).setTimestamp().setDescription(`**${temp}℃**`).setFooter(`${time} 기준`));
    }
};