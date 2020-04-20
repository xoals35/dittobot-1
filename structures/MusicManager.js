const { Collection, MessageEmbed } = require("discord.js");
const { Manager } = require("@lavacord/discord.js");
const { Rest } = require("lavacord");
const Queue = require("./Queue");

/**
 * @class MusicManager
 */
class MusicManager {
    /**
     * @param {import("./MusicClient")} client
     */
    constructor(client) {
        this.client = client;
        this.manager = new Manager(client, [{id: process.env.LAVALINK_ID, host: process.env.LAVALINK_HOST, port: process.env.LAVALINK_PORT, password: process.env.LAVALINK_PASSWORD}],  {
            user: client.user.id,
            shards: client.shard ? client.shard.count : 0
        });
        this.manager.connect().then(console.log("Lavalink Connected"));
        
        this.queue = new Collection();
    }

    async handleVideo(message, voiceChannel, song) {
        const serverQueue = this.queue.get(message.guild.id);
        song.requestedBy = message.author;

        if (!serverQueue) {
            const queue = new Queue(this.client, {
                textChannel: message.channel,
                voiceChannel
            });
            queue.songs.push(song);
            this.queue.set(message.guild.id, queue);

            try {
                const player = await this.manager.join({
                    channel: voiceChannel.id,
                    guild: message.guild.id,
                    node: "default"
                });

                queue.setPlayer(player);
                this.play(message.guild, song);
            } catch (error) {
                console.error;

                this.queue.delete(message.guild.id);
                this.manager.leave(message.guild.id);
                message.channel.send(new MessageEmbed().setDescription(`❌ 음성 채널에 들어갈 수 없어요!\n${error}`).setColor(0xFF0000));
            }
        } else {
            serverQueue.songs.push(song);
            message.channel.send(new MessageEmbed().setDescription(`✅ **${song.info.title}**이(가) 대기열에 추가되었습니다!`).setColor(0x00FF00));
        }
    }

    play(guild, song) {
        const serverQueue = this.queue.get(guild.id);

        if (!song) {
            serverQueue.textChannel.send(new MessageEmbed().setTitle('✅ 모든 음악 재생 완료!').setColor(0x00FF00));
            this.manager.leave(guild.id);
            this.queue.delete(guild.id);
        } else {
            serverQueue.player.play(song.track);
            serverQueue.player
                .once("error", console.error)
                .once("end", data => {
                    if (data.reason === "REPLACED") return;

                    const shiffed = serverQueue.songs.shift();
                    if (serverQueue.loop) {
                        serverQueue.songs.push(shiffed);
                    }

                    this.play(guild, serverQueue.songs[0]);
                });
            serverQueue.player.volume(serverQueue.volume);
            serverQueue.textChannel.send(new MessageEmbed().setColor(0x00FF00).setTitle(song.info.title).setURL(song.info.uri).setDescription(`✅ 곧 **${song.info.title}** - **${song.info.author}**이(가) 재생됩니다!`));
        }
    }

    async getSongs(query) {
        const node = this.manager.nodes.get("default");
        const result = await Rest.load(node, query);

        switch(result.loadType) {
            case "PLAYLIST_LOADED": {
                return //result.playlistInfo
            }

            case "TRACK_LOADED": {
                return result.tracks
            }

            case "SEARCH_RESULT": {
                return result.tracks
            }
        }
    }
}

module.exports = MusicManager;