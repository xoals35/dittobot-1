const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

const langToName = {
    'ko': '한국어',
    'ja': '일본어',
    'zh-cn': '중국어 간체',
    'zh-tw': '중국어 번체',
    'hi': '힌디어',
    'en': '영어',
    'es': '스페인어',
    'fr': '프랑스어',
    'de': '독일어',
    'pt': '포르투갈어',
    'vi': '베트남어',
    'id': '인도네시아어',
    'fa': '페르시아어',
    'ar': '아랍어',
    'mm': '미얀마어',
    'th': '태국어',
    'ru': '러시아어',
    'it': '이탈리아어',
    'unk': '알 수 없음'
};

module.exports = {
    name: 'papagolang',
    aliases: ['언어감지'],
    category: 'naver',
    run: async (client, message, args) => {
        if (!args.join(" ")) return;

        const { langCode } = await fetch('https://openapi.naver.com/v1/papago/detectLangs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_API_CLIENT_SECRET
            },
            body: `query=${args.join(" ")}`
        }).then(e => e.json())

        message.channel.send(new MessageEmbed().setTitle('파파고 언어감지').setColor(0x00ff00).setDescription(`\`\`\`fix\n${args.join(" ")}\n\`\`\`\n**결과**\`\`\`yml\n${langToName[langCode]} (${langCode})\n\`\`\``))
    }
};