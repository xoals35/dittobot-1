const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["도움", "ㅗ디ㅔ", "ehdna", "도움말"],
    category: "command",
    usage: "[command | alias]",
    description: 'help command',
    run: async (client, message, args, ops) => {
        if (args.join(' ') === "<명령어 이름>") {
            message.channel.send('.... 진짜로 쓰시다니...')
        } else if (args.join(' ')) {
            const embed = new MessageEmbed();
        
            const cmd = client.commands.get(args.join(" ").toLowerCase()) || client.commands.get(client.aliases.get(args.join(" ").toLowerCase()));
        
            let info = `**${args.join(" ").toLowerCase()}**에 대한 명령어를 찾을 수 없습니다.`;
        
            if (!cmd) return message.channel.send(embed.setColor(0xff0000).setTitle(info));
        
            if (cmd.name) embed.setTitle(`${cmd.name} info`);
            if (cmd.aliases) info = `\n**Aliases**\n${cmd.aliases.map(a => `${a}`).join(", ")}\n`;
            if (cmd.description) info += `\n**Description**\n${cmd.description}\n`;
            if (cmd.usage) {
                info += `\n**Usage**\n${cmd.usage}\n`;
                embed.setFooter(`Syntax: <> = required, [] = optional`);
            };
            if (cmd.category) info += `\n**Category**\n${cmd.category}`;
        
            embed.setDescription(info).setColor(0x00ffff);
        
            return message.channel.send(embed);
        } else {
            const commandEmbed = new MessageEmbed().setColor(0x00ffff).setTitle(`${client.user.username} 도움말`).setFooter(`${ops.prefix} 도움 <명령어 이름> 으로 더 자세히 아실 수 있습니다.`, client.user.displayAvatarURL());
        
            const commands = (category) => {
                return client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(", ");
            };
        
            const info = client.categories.filter(n => n !== "owner").map(cat => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}**\n${commands(cat)}`).reduce((string, category) => string + "\n\n" + category);

            message.channel.send(commandEmbed.setDescription(info));

            /*let pages = ['Description Page 1', 'Page 2', 'Page 3'];
            let page = 1;
    
            const embed = new MessageEmbed()
                .setColor(0x00ffff)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`페이지 ${pages.length}쪽 중 ${page}쪽`)
                .setTitle(`${client.user.username} 도움말`)
                .setDescription(pages[page-1])
    
            message.channel.send(embed).then(msg => {
                msg.react('◀').then( r => {
                    msg.react('▶')
    
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
    
                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
    
                    backwards.on('collect', (r, u) => {
                        r.users.remove(u.id)
    
                        if (page === 1) return;
                        page--;
                        embed.setTitle(`${client.user.username} 도움말`).setDescription(pages[page-1]).setFooter(`${pages.length}/${page}`);
                        msg.edit(embed)
                    })
    
                    forwards.on('collect', (r, u) => {
                        r.users.remove(u.id)
    
                        if (page === pages.length) return;
                        page++;
                        embed.setTitle(`${client.user.username} 도움말`).setDescription(pages[page-1]).setFooter(`${pages.length}/${page}`);
                        msg.edit(embed)
                    })
                })
            })*/
        };
    }
};