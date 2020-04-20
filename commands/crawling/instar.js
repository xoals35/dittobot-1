const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const fetch = require("node-fetch");

module.exports = {
    name: "instar",
    aliases: ["인스타", "insta", "instargram", "인스타그램"],
    category: "crawling",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("검색할 인스타그램 유저를 입력해 주세요!");

        let res;

        try {
            res = await fetch(`https://www.instagram.com/${args.join(" ").toString().replace(/ /gi, '+')}/?__a=1`).then(e => e.json());
        } catch (e) {
            console.error;
            return message.channel.send(`\`${args.join(" ")}\` (이)라는 유저를 찾을 수 없습니다...`);
        };

        const account = res.graphql.user;

        message.channel.send(new MessageEmbed().setAuthor('Instargram', 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png', 'https://www.instagram.com/').setColor(0xff00bd).setTimestamp()
            .setFooter(account.username, account.profile_pic_url_hd)
            .setTitle(`${account.full_name}님의 정보`)
            .setURL(account.external_url_linkshimmed)
            .setThumbnail(account.profile_pic_url_hd)
            .setDescription(`**[들어가기](https://www.instagram.com/${account.username})**`)
            .addFields([
                {
                    name: '계정 이름',
                    value: stripIndents`**${account.username}**`
                },
                {
                    name: '닉네임',
                    value: stripIndents`**${account.full_name}**`
                },
                {
                    name: '소개글',
                    value: `**${account.biography.length === 0 ? "없음" : account.biography}**`
                },
                {
                    name: '비공개 여부',
                    value: `**${account.is_private ? "비공개 🔐" : "공개 🔓"}**`
                },
                {
                    name: '계정 게시글 수',
                    value: `**${account.edge_owner_to_timeline_media.count}개**`,
                    inline: true
                },
                {
                    name: '계정 팔로워 수',
                    value: `**${account.edge_followed_by.count}명**`,
                    inline: true
                },
                {
                    name: '계정 팔로우 수',
                    value: `**${account.edge_follow.count}명**`,
                    inline: true
                }
            ])
        );
    }
};