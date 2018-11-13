const discord = require('discord.js');
const emailer = require('nodemailer');
const client = new discord.Client();
const cfg = require('./config.json');
var messages = [];
var authors = [];
var timespans = [];
var guilds = [];
var messageCount = 0;
// const Enmap = require('enmap');

const pass = cfg.pass;
guilds = [];
newGuild = 0;

var transporter = emailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'updatebot15@gmail.com',
		pass: pass[5] + pass[7] + pass[9] + pass[9] + pass[2] + pass[7] + pass[8] + pass[1] + pass[0] + pass[0] + pass[2] + pass[8]
	}
});

// client.settings = new Enmap({
// 	name: "settings",
// 	fetchAll: false,
// 	autoFetch: true,
// 	cloneLevel: 'deep'
// });

// const defaultSettings = {	
// 	prefix: "!",	
// 	gmail: "wovencoast14782@gmail.com"	
// }

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(`${cfg.prefix}help | ${client.guilds.size} servers`);
});

client.on('message', msg => {
	// const guildConf = client.settings.ensure(msg.guild.id, defaultSettings);
	if (!msg.guild || msg.author.bot) return;

	messages[messageCount] = msg.content;
	authors[messageCount] = msg.author.username;
	timespans[messageCount] = msg.createdAt;
	guilds[messageCount] = msg.guild;
	console.log(`Message: ${messages[messageCount]}\nAuthor: ${authors[messageCount]}\nTimespan: ${timespans[messageCount]}\nServer: ${guilds[messageCount]}`);
	messageCount++;

	const args = msg.content.slice(cfg.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (msg.content.includes('prefix') && !msg.author.bot) {
		if (args[0] === 'undefined') {
			msg.channel.send(`The current prefix is "${cfg.prefix}" (without the quotes obviously :smile:)`);
			return;
		}
		var oldprefix = cfg.prefix;
		cfg.prefix = args[0];
		msg.reply(`set the prefix to "${cfg.prefix}", use the new prefix instead of "${oldprefix}"`);
		return;
	}

	if (msg.content.startsWith(cfg.prefix)) {

		if (command === 'ping') {
			msg.reply(`Pong!`);
			return;
		}

		if (command === 'email') {
			if (args.length == 0) {
				msg.reply('The current email is ' + cfg.email);
				return;
			}
			if (!args[0].includes('@') || !args[0].includes('.')) {
				msg.reply(`Don't think I'm dumb, I know that is not an email :smile:`);
				return;
			}
			cfg.email = args[0];
			msg.reply(`Your email has been set to ${cfg.email}`);
			return;
		}

		if (command === "status") {
			msg.reply(`Sending you a status on ${cfg.email}`);
			var htmlPage = `<h1>You have Discord mail!</h1>`;
			for (var index = 0; index < messages.length; index++) {
				htmlPage = htmlPage + (`<p>` + authors[index] + ` said "` + messages[index] + `" in ` + guilds[index] + ` at ` + timespans[index] + `</p>`);
			}
			console.log(htmlPage);
			var mailOptions = {
				from: 'updatebot15@gmail.com',
				to: cfg.email,
				subject: 'You have some Discord messages',
				html: htmlPage
			}
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					msg.reply(error.content);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
			msg.reply('Sent status');
			return;
		}

		if (command === "prefix") {
			if (args.length == 0) {
				msg.reply(`The prefix is "${cfg.prefix}" (without the quotes obviously :smile:)`);
				return;
			}
			var oldprefix = cfg.prefix;
			cfg.prefix = args[0];
			msg.reply(`set the prefix to "${cfg.prefix}", use the new prefix instead of "${oldprefix}"`);
			return;
		}

		if (command === 'help') {
			msg.channel.send('Hopefully this helps :smile:', {embed:{
				title: 'Prefix',
				color: 0x2471a3, 
				description: `The prefix for this bot is by default "${cfg.prefix}" (without the quotes)`,
				fields:[
					{
						name: `${cfg.prefix}ping`,
						value: `${cfg.prefix}ping will let you know if the bot is active or not`
					},
					{
						name: `${cfg.prefix}help`,
						value: `${cfg.prefix}help brings up this message`
					},
					{
						name: `${cfg.prefix}email`,
						value: `${cfg.prefix}email will tell you what email the bot sends the status to`
					},
					{
						name: `${cfg.prefix}email [newemail]`,
						value: `${cfg.prefix}email with an attribute will set the email to the new email`
					},
					{
						name: `${cfg.prefix}status`,
						value: `${cfg.prefix}status will send you an email about the messages from all of the servers that it has received a message from`
					}
				],
				footer: {
					text: `Created kindly for Tangent Universe by WovenCoast14782`
				}
			}});
			return;
		}

		msg.reply('Unknown command, try .help');
	}
});

client.login(cfg.token);