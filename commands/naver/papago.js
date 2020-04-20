const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

const languageList = ['ko', 'en', 'zh-CN', 'zh-TW', 'es', 'fr', 'vi', 'th', 'id', '한국어', '영어', '중국어 간체', '중국어', '중국어 번체', '스페인어', '프랑스어', '베트남어', '태국어', '인도네시아어', 'korean', 'english', 'chinese'];

const langToName = {
    "ko": "한국어",
    "en": "영어",
    "zh-CN": "중국어 간체",
    "zh-TW": "중국어 번체",
    "es": "스페인어",
    "fr": "프랑스어",
    "vi": "베트남어",
    "th": "태국어",
    "id": "인도네시아어"
};

const nameToLang = {
    "한국어": "ko",
    "영어": "en",
    "중국어간체": "zh-CN",
    "중국어": "zh-CN",
    "중국어번체": "zh-TW",
    "스페인어": "es",
    "프랑스어": "fr",
    "베트남어": "vi",
    "태국어": "th",
    "인도네시아어": "id"
};

module.exports = {
    name: "papago",
    aliases: ["파파고", "앵무새"],
    category: "naver",
    run: async (client, message, args) => {
        if (!args[0]) return;
        if (!args[1]) return;
        if (!args.slice(2).join(" ")) return;

        if (!languageList.includes(args[0]) || !languageList.includes(args[1])) return message.channel.send("파파고 API에서 지원하지 않는 언어가 들어 있습니다.");

        const srcLang = nameToLang[args[0]] || args[0];
        const tarLang = nameToLang[args[1]] || args[1];

        const { message: { result: { translatedText, srcLangType, tarLangType } } } = await fetch('https://openapi.naver.com/v1/papago/n2mt', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_API_CLIENT_SECRET
            },
            body: `source=${srcLang}&target=${tarLang}&text=${args.slice(2).join(" ")}`
        }).then(e => e.json());

        message.channel.send(new MessageEmbed().setTitle("파파고").setDescription(`**${langToName[srcLangType]} (${srcLangType})** -> **${langToName[tarLangType]} (${tarLangType})**\n\n**번역 전**\n\`\`\`fix\n${args.slice(2).join(" ")}\n\`\`\`\n**번역 후**\n\`\`\`yml\n${translatedText}\n\`\`\``).setColor(0x00ff00));
    }
};