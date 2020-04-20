const cheerio = require('cheerio');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "melonchart",
    aliases: ["멜론 차트", "멜론차트"],
    category: 'crawling',
    run: async (client, message, args) => {
        await axios.get('http://www.melon.com/chart/').then(res => {
            if (res.status !== 200) return;

            const $ = cheerio.load(res.data);

            let result = {title: [], artist: [], album: []};

            $('div.wrap > div.wrap_song_info > div.ellipsis.rank01').each((i, element) => {
                result['title'][i] = $(element).find('span > a').text();
            });

            $('div.wrap > div.wrap_song_info > div.ellipsis.rank02').each((i, element) => {
                result['artist'][i] = $(element).find('span.checkEllipsis > a').text();
            });

            $('div.wrap > div.wrap_song_info > div.ellipsis.rank03').each((i, element) => {
                result['album'][i] = $(element).find('a').text();
            });

            result['update'] = `${$('div.calendar_prid > span.yyyymmdd > span.year').text()} ${$('span.hhmm > span.hour').text()}`;

            let resp = ``;

            for (var i = 0; i < 10; i++) {
                resp += `**${i+1}위 ${result.title[i]} - ${result.artist[i]}**\n`;
            };

            message.channel.send(new MessageEmbed().setTitle('멜론 차트 1위 ~ 10위').setColor(0x00ff00).setAuthor('Melon', 'https://img1.daumcdn.net/thumb/C500x500.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/5fXt/image/YUEdn1eyBz1ThXP4wqiosPurn28.png', 'https://melon.com/').setDescription(resp).setFooter(`${result.update} 업데이트`).setTimestamp());
        });
    }
};