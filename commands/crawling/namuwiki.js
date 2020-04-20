const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    name: 'namuwiki',
    aliases: ['나무위키', '꺼무위키'],
    run: async (client, message, args) => {
        if (!args.join(" ")) return;

        await axios.get(`https://namu.wiki/Search?q=${encodeURI(args.join(" "))}`).then(res => {
            if (res.status !== 200) return message.channel.send('정보를 불러올 수 없습니다.');

            let result = {
                result: [],
                goTo: [],
                description: []
            };

            const $ = cheerio.load(res.data);

            $('div.search-item').each((i, element) => {
                result['result'][i] = $(element).find('h4 > a').text().trim();
                result['goTo'][i] = `https://namu.wiki${$(element).find('h4 > a').attr('href')}`;
                result['description'][i] = $(element).find('div').text().trim();
            });

            let str = ``;

            for (var i = 0; i < result.result.length; i++) {
                str += `[${result.result[i]}](${result.goTo[i]})\n`;
            };
    
            message.channel.send(new MessageEmbed().setTitle('꺼무위키 검색 결과').setDescription(str).setColor(0x008275));
        })
    }
};