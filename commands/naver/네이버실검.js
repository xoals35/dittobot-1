const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "네이버실검",
    aliases: ["실시간 검색어", "실검", "네이버 실검"],
    category: 'naver',
    run: async (client, message, args) => {    
        const { data } = await fetch('https://www.naver.com/srchrank?frm=main').then(e => e.json());
        let resp = ``;

        for (var i = 0; i < 10; i++) {
            resp += `**${i+1}위**\n[${data[i].keyword}](https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${data[i].keyword.replace(/ /gi, '+')})\n\n`
        };

        message.channel.send(new MessageEmbed().setAuthor('Naver', 'https://images-ext-2.discordapp.net/external/42ygoEiRXm11O1d1fr9HLm5qcr0avgCd7zquMYh-9jU/http/pluspng.com/img-png/naver-logo-png-naver-300.png', 'https://naver.com/').setTitle('네이버 실시간 검색어').setColor(0x00ff00).setTimestamp().setDescription(resp).setFooter(message.author.username, message.author.displayAvatarURL()));
    }
};