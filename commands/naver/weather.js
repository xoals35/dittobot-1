const cheerio = require("cheerio");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "weather",
    aliases: ["날씨", "skfTl", "ㅈㄷㅁ솓ㄱ"],
    category: "naver",
    run: async (client, message, args) => {
        if (!args[0]) return;

        await axios.get(`https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${encodeURI(`${args.join(" ").replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')} 날씨`)}`).then(res => {
            if (res.status !== 200) return;

            const $ = cheerio.load(res.data);

            const get = {
                region: $('div.sort_box > div.lst_select > div.select_box > span.btn_select > em').text(),
                stats: {
                    result: $('div.today_area._mainTabContent > div.main_info > div.info_data > ul.info_list > li > p.cast_txt').text().split(',')[0],
                    stats: $('div.today_area._mainTabContent > div.main_info > div.info_data > ul.info_list > li > p.cast_txt').text(),
                    emoji: stats[$('div.today_area._mainTabContent > div.main_info > div.info_data > ul.info_list > li > p.cast_txt').text().split(',')[0]]
                },
                temp: $('div.today_area._mainTabContent > div.main_info > div > p > span.todaytemp').text(),
                findDust: {
                    result: $('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd > span.num').eq(0).text().split('㎍/㎥')[0],
                    stats: $('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd').first().text().split('㎍/㎥')[1],
                    emoji: findDust[$('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd').first().text().split('㎍/㎥')[1]]
                },
                ultrafineDust: {
                    result: $('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd > span.num').eq(1).text().split('㎍/㎥')[0],
                    stats: $('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd').eq(1).text().split('㎍/㎥')[1],
                    emoji: findDust[$('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd').eq(1).text().split('㎍/㎥')[1]]
                },
                ozoneIndex: {
                    result: $('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd > span.num').eq(2).text().split('ppm')[0],
                    stats: $('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd').eq(2).text().split('ppm')[1],
                    emoji: findDust[$('div.today_area > div.sub_info > div.detail_box > dl.indicator > dd').eq(2).text().split('ppm')[1]]
                },
                ultravioletRays: {
                    result: $('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(3) > span.indicator > span > span.num').first().text(),
                    stats: $('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(3) > span.indicator > span').first().text().split(`${$('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(3) > span.indicator > span > span.num').first().text()}`)[1],
                    emoji: ultravioletRays[$('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(3) > span.indicator > span').first().text().split(`${$('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(3) > span.indicator > span > span.num').first().text()}`)[1]]
                },
                sensoryTemp: $('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(2) > span.sensible > em').text().split('˚')[0],
                precipitationPerHour: $('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(3) > span.rainfall > em').text().split('mm')[0],
                probabilityOfPrecipitation: $('div.today_area > div.table_info.bytime._todayWeatherByTime > div.info_list.rainfall._tabContent > ul.list_area > li.on.now.merge1:nth-child(1) > dl > dd.weather_item._dotWrapper > span').text(),
                windSpeed: $('div.today_area > div.table_info > div.info_list.wind._tabContent > ul.list_area > li.on.now:nth-child(1) > dl > dd.weather_item > span').text(),
                windDirection: $('div.today_area > div.table_info > div.info_list.wind._tabContent > ul.list_area > li.on.now:nth-child(1) > dl > dd.item_condition > span.wt_status > span.ico_wind').text().split('˚')[0],
                humidity: $('div.today_area > div.table_info > div.info_list.humidity._tabContent > ul.list_area > li.on.now:nth-child(1) > dl > dd.weather_item._dotWrapper > span').text().split('˚')[0],
                lowestTemperature: $('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(2) > span.merge > span.min').text().split('˚')[0],
                peakTemperature: $('div.today_area > div.main_info > div.info_data > ul.info_list > li:nth-child(2) > span.merge > span.max').text().split('˚')[0],
                update: $('div.guide_bx._guideBox > p.guide > span.guide_txt > span.update').eq(0).text()
            };

            let s = `\`자외선\`: **${get.ultravioletRays.result} ${get.ultravioletRays.stats} ${get.ultravioletRays.emoji}**`;

            if (!get.region || get.region.includes(process.env.REGION)) return message.channel.send('지역을 찾을 수 없습니다.');

            if (!get.ultravioletRays.result) s = `\`시간당 강수량\`: **${get.precipitationPerHour}mm**`;
    
            const embed = new MessageEmbed().setColor(0x00ffff).setTimestamp().setFooter(message.author.username, message.author.displayAvatarURL())
            .setFooter(`${get.update} 업데이트`, message.author.displayAvatarURL())
            .setTitle(get.region)
            .setDescription(`**${get.stats.emoji} ${get.stats.stats}**\n\`현재 온도\`: **${get.temp}℃**\n\`체감 온도\`: **${get.sensoryTemp}˚**\n\`최저 / 최고\`: **${get.lowestTemperature}˚ / ${get.peakTemperature}˚**\n\n${s}\n\`강수 확률\`: **${get.probabilityOfPrecipitation}%**\n\`풍속\`: **${get.windSpeed}m/s (${get.windDirection}쪽)**\n\`습도\`: **${get.humidity}%**`)
            .addFields([
                { name: '미세먼지', value: `**${get.findDust.result}㎍/㎥ ${get.findDust.stats} ${get.findDust.emoji}\n초미세먼지: ${get.ultrafineDust.result}㎍/㎥ ${get.ultrafineDust.stats} ${get.ultrafineDust.emoji}**`, inline: true },
                { name: '오존지수', value: `**${get.ozoneIndex.result}ppm ${get.ozoneIndex.stats} ${get.ozoneIndex.emoji}**`, inline: true }
            ]);
    
            message.channel.send(embed);
        });
    }
};

const findDust = {
    "매우 좋음": '😀',
    "좋음": '😃',
    "보통": '🙂',
    "나쁨": '🙁',
    "매우 나쁨": '😷'
};

const ultravioletRays = {
    "매우 낮음": '😀',
    "낮음": '😃',
    "보통": '🙂',
    "높음": '🙁',
    "매우 높음": '☹'
};

const stats = {
    "맑음": "☀",
    "흐림": "☁",
    "구름많음": "🌥"
};