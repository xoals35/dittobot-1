const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "disaster",
    aliases: ["재난문자", "재난 문자", "안전 문자", "안전문자"],
    category: "crawling",
    run: async (client, message, args) => {
        const getJSON = await fetch('http://m.safekorea.go.kr/idsiSFK/neo/ext/json/disasterDataList/disasterDataList.json').then(res => res.json());
        
        let res = ``;

        for (var i = 0; i < 5; i++) {
            res += `${getJSON[i].CONT} (${getJSON[i].SJ})\n\n`;
        };

        message.channel.send(new MessageEmbed().setTitle('재난 문자').setColor(0xff0000).setDescription(res));
    }
};