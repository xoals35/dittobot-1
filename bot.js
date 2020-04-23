require("dotenv").config();

const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const chalk = require("chalk");

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");
client.musicManager = null;

const ascii = require('ascii-table');
const table = new ascii().setHeading("Command", "Status");

readdirSync("./commands/").forEach(dir => {
	const commands = readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));

	for (let file of commands) {
		let pull = require(`./commands/${dir}/${file}`);

		if (pull.name) {
			client.commands.set(pull.name, pull);
			table.addRow(file, '✅');
		} else {
			table.addRow(file, '❌');
			continue;
		};

		if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
	};
});

process.on('unhandledRejection', console.error)
.on("uncaughtException", console.error)
.on('warning', console.warn)
.on('exit', console.log);

client.login();

client.on("ready", () => {
	console.log(`${table.toString()}\nLogin ${client.user.username}\n----------------------------`);

	const activity = [`${client.guilds.cache.size}개의 서버`, `${client.users.cache.filter(e => !e.bot).size}명의 유저`, `${client.guilds.cache.size} guilds`, `${client.users.cache.filter(e => !e.bot).size} users`, `https://is.gd/dittoBot`];

	setInterval(() => {
		client.user.setActivity(activity[Math.floor(Math.random() * activity.length)]);
	}, 10000);

	const MusicManager = require('./structures/MusicManager')
	client.musicManager = new MusicManager(client);
})
.on("message", async message => {
	if (message.author.bot || message.system || !message.content.startsWith(process.env.PREFIX)) return;

	if (message.channel.type === 'dm' && message.author.id !== process.env.OWNER_ID) {
		message.channel.send(`DM에서는 ${client.user.username}을(를) 사용하실 수 없습니다.\n${client.user.username}이(가) 있는 서버에서 사용해 주세요.`)
		return console.log(`${chalk.green('DM Message')} ${message.author.username} (${message.author.id}): ${message.content}`)
	}

	if (message.channel.type === 'text' && message.author.id !== process.env.OWNER_ID) console.log(`${chalk.yellow('Message')} ${message.author.username} (${message.author.id}): ${message.content} | GUILD: ${message.guild.name} (${message.guild.id}) | CHANNEL: ${message.channel.name} (${message.channel.id})`);

	if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send(`${client.user.username}을(를) 원활하게 이용하실려면 **EMBED_LINKS**(링크 보내기) 권한이 필요합니다!`)

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	try {
		let ops = {
			ownerID: process.env.OWNER_ID,
			prefix: process.env.PREFIX
		};

		if (command) {
			if (message.author.id !== process.env.OWNER_ID && command.developer) return message.channel.send(`\`${client.user.username} 개발자\`만 가능합니다.`);
			command.run(client, message, args, ops);
		} else {
			const { response: { replies: [{ text }] } } = await require("node-fetch")(`https://builder.pingpong.us/api/builder/${process.env.pingpong}/integration/v0.2/custom/${message.author.id}`, {
				method: 'POST',
				headers: {
					'Authorization': `Basic ${process.env.Authorization}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					request: {
						query: cmd
					}
				})
			}).then(res => res.json());

			message.channel.send(text);
		};
	} catch (e) {
		console.error;
	};
})
.on('guildCreate', guild => {
	console.log(`${chalk.blue('Guild Create')} name: ${guild.name} (${guild.id}), owner: ${guild.owner.user.tag} (${guild.ownerID})`)
})
.on('guildDelete', guild => {
	console.log(`${chalk.red('Guild Delete')} name: ${guild.name} (${guild.id}), onwer: ${guild.owner.user.tag} (${guild.ownerID})`)
})
.on('rateLimit', rateLimit => {
	console.log(`${chalk.blueBright('RateLimit')} limit: ${rateLimit.limit}, timeout: ${rateLimit.timeout}, method: ${rateLimit.method}, route: ${rateLimit.route}`)
})
.on('error', console.error)
.on('warn', console.warn);