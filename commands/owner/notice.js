const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "notice",
    aliases: ["공지", "공지사항"],
    category: 'owner',
    developer: true,
    run: async (client, message, args, ops) => {
        if (!args[0]) return message.channel.send('내용을 써 주세요!');

        /*
            공지 코드 출처: https://github.com/Bluebear645/maple/blob/48448706cf328204988b669054af33461703c86a/commands/%5B%EB%8B%A8%ED%92%8D%EC%95%84%5D%20%EC%A0%84%EC%B2%B4%EA%B3%B5%EC%A7%80.js
            Discord.Js Notice Bot by 오아시스 (iOas // Oasics#5074)
        */

        let filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '⭕') && user.id === message.author.id;

        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 공지사항`).setDescription(`\`\`\`\n${args.join(" ")}\n\`\`\``).setColor("RANDOM")).then(async (th) => {
            await th.react('⭕');
            await th.react('❌');
            
            th.awaitReactions(filter, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '⭕') {
                    let errors = ``;

                    client.guilds.cache.forEach(g => {
                        let gc;

                        g.channels.cache.forEach(c => {
                            if (c.name.includes(`${client.user.username}`) || c.name.includes('bot-notice') || c.name.includes('bot_notice') || c.name.includes('botnotice') || c.name.includes('봇공지') || c.name.includes('봇-공지') || c.name.includes('봇_공지') || c.name.includes('🌐|봇_실험')) gc = `${c.id}`;
                        });

                        let ann = new MessageEmbed().setTitle(`${client.user.username} 공지사항`).setThumbnail(client.user.displayAvatarURL()).setDescription(args.join(" ")).setColor(0xffff00).setFooter(message.author.tag, message.author.displayAvatarURL()).setTimestamp();
                        let Ch = client.channels.cache.get(gc);
                        let ment = ``;

                        try {
                            if (!Ch.permissionsFor(g.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])) ment = `${g.name}: 발신 실패 (메시지 발신 불가)\n`;
                            else Ch.send(ann);
                        } catch (e) {
                            if (!Ch) ment = `${g.name}: 발신 실패 (채널이 없음)\n`;
                            else ment = `${g.name}: 발신 실패 (오류: ${e})\n`;
                        } finally {
                            if (ment) errors += ment;
                        };
                    });

                    if (!errors) errors = '성공적으로 모든 서버에 발신되었습니다!';
            
                    th.edit(new MessageEmbed().setTitle('발신 완료').setDescription(`**결과**\n\`\`\`\n${errors}\n\`\`\``).setColor("RANDOM"));
                } else {
                    th.edit(new MessageEmbed().setTitle('공지사항 발신 취소').setColor("RANDOM"));
                };
            });
        });
    }
};