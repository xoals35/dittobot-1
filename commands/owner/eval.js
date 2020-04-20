const { MessageEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
    name: "eval",
    aliases: ["compile", "com", "컴파일", "comp", "ev", "ㄷㅍ미", "실행"],
    category: "owner",
    developer: true,
    run: async (client, message, args, ops) => {
        if (!args[0]) return;

        let input = `const Discord = require("discord.js");\nconst axios = require("axios");\nconst cheerio = require("cheerio");\nconst beautify = require("beautify");\nconst util = require("util");\nconst fetch = require("node-fetch");\nconst { stripIndents } = require("common-tags");\nconst fs = require("fs");\nconst moment = require("moment-timezone");\nmoment.locale("ko-KR");\nconst ascii = require("ascii-table");\nconst table = new ascii();\nconst child = require("child_process");\nconst chalk = require('chalk');\n${args.join(" ")}`;

        let type;
        new Promise(resolve => resolve(eval(input))).then(async res => {
            let output = type = res;

            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            if (typeof type === 'function') output = type.toString();
            if (output.includes(process.env.DISCORD_TOKEN)) output = output.replace(new RegExp(process.env.DISCORD_TOKEN, "gi"), 'Secret');

            if (output.length > 1500) output = `${output.substr(0, 1495)}...`;

            message.channel.send(new MessageEmbed().setTitle('Eval').setColor(0x00ff00).setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${output}\n\`\`\``));
        }).catch(e => {
            message.channel.send(new MessageEmbed().setTitle('Eval').setColor(0xff0000).setDescription(`**📥 Input: **\n\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\`\n**📤 Output: **\n\`\`\`js\n${e}\n\`\`\``));
        });
    }
};