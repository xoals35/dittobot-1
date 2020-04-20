const express = require("express");
const app = express();
const moment = require('moment-timezone');
moment.locale('ko-KR');

const PORT = process.env.PORT || 3156;

module.exports = {
    run: async (client) => {
        app.listen(PORT, async () => {
            console.log(`Server Started... ${PORT}`)

            await require('ngrok').connect({
                proto: 'http',
                addr: PORT,
                authtoken: process.env.NGROK_AUTHTOKEN
            }).then(console.log)
        });

        app.set('view engine', 'ejs');
        app.set('views', `${__dirname}/views`)
        app.engine('html', require('ejs').renderFile)

        app.use(express.static('public'))

        app.get('/', (req, res) => {
            res.render('index', {
                username: client.user.username,
                displayAvatarURL: client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                    size: 1024
                }),
                id: client.user.id,
                ping: client.ws.ping,
                guild: client.guilds.cache.size,
                user: client.users.cache.size
            });
        });

        app.get('/invite', (req, res) => {
            res.render('invite', {
                username: client.user.username,
                displayAvatarURL: client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                    size: 1024
                }),
                id: client.user.id
            });
        });

        app.get('/api/v1', (req, res) => {
            res.json({'api/v1/bot': `${client.user.username} API`})
        })

        app.get('/api/v1/bot', (req, res) => {
            botAPI(client).then(e => res.send(e)).catch(e => console.error(e));
        });

        app.all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.send('404 Not found');
            next();
        });
    }
};

let botAPI = (client) => {
    return new Promise((resolve, reject) => {
        let result = {
            user: {
                id: client.user.id,
                username: client.user.username,
                tag: client.user.tag,
                discriminator: client.user.discriminator,
                avatar: client.user.avatar,
                displayAvatarURL: client.user.displayAvatarURL({
                    dynamic: true,
                    size: 1024,
                    format: 'png'
                }),
                createdAt: client.user.createdAt
            },
            users: {
                size: client.users.cache.size,
                botSize: client.users.cache.filter(n => n.bot).size,
                userSize: client.users.cache.filter(n => !n.bot).size
            },
            channels: {
                size: client.channels.cache.size,
                textChannelSize: client.channels.cache.filter(n => n.type === "text").size,
                voiceChannelSize: client.channels.cache.filter(n => n.type === "voice").size,
                categoryChannelSize: client.channels.cache.filter(n => n.type === "category").size,
                newsChannelSize: client.channels.cache.filter(n => n.type === "news").size
            },
            guilds: {
                size: client.guilds.cache.size
            },
            emojis: {
                size: client.emojis.cache.size
            },
            ws: {
                ping: client.ws.ping
            },
            uptime: client.uptime,
            embed: {
                title: `${client.user.username} API`,
                color: "#ffff00",
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL({
                        dynamic: true,
                        size: 1024,
                        format: 'png'
                    })
                },
                description: `봇 이름: ${client.user.username}\n봇 ID: ${client.user.id}\n봇 태그: ${client.user.tag}`
            }
        };

        resolve(result);
    });
};

let duration = (ms) => {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')}일 ${hrs.padStart(2, '0')}시간 ${min.padStart(2, '0')}분 ${sec.padStart(2, '0')}초`;
};