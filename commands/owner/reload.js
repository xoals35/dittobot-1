const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "reload",
    aliases: ["리로드", "ㄱ디ㅐㅁㅇ", "ffe", "ㄹㄹㄷ", "flfhem"],
    category: "owner",
    developer: true,
    run: async (client, message, args, ops) => {
        const m = await message.channel.send(new MessageEmbed().setTitle(`${client.emojis.cache.find(x => x.name == "loadingCirclebar")} ${client.user.username}의 모든 파일을 리로드 중... (${client.commands.size}개)`).setColor(0xffff00));

        readdirSync("./commands/").forEach(dir => {
            const commands = readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
    
            for (let file of commands) {
                let pull = require(`../${dir}/${file}`);

                if (pull.name) {
                    delete require.cache[require.resolve(`../${dir}/${file}`)];
                    client.commands.set(pull.name, pull);
                } else continue;

                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            };
        });
        
        m.edit('', new MessageEmbed().setTitle(`✅ ${client.user.username}의 모든 파일을 리로드 완료! (${client.commands.size}개)`).setColor(0xffff00));
    }
};