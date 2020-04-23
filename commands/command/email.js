const mail = require("nodemailer")

module.exports = {
    name: "email",
    aliases: ['mail', '드먀ㅣ', 'gmail', '이메일'],
    category: 'command',
    run: async (client, message, args) => {
        if (!args[0]) return

        const titleAndDescription = args.slice(1).join(' ').split(';')

        if (!titleAndDescription[0]) return
        if (!titleAndDescription[1]) return

        let transporter = mail.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: args[0],
            subject: titleAndDescription[0],
            text: `${titleAndDescription[1]}\n\n--------------------------\n디스코드 유저 ${message.author.tag} 님이 디스코드 봇 ${client.user.username} 으로 보낸 메일입니다.`
        }, (err) => {
            if (err) {
                message.channel.send('Error...')
                return console.log(err)
            } else message.channel.send(`\`${args[0]}\`(으)로 제목: \`${titleAndDescription[0]}\`, 내용: \`${titleAndDescription[1]}\` 을 보냈습니다!`)
        })
    }
}