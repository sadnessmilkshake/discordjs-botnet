const Discord = require("discord.js");
const fs=require("fs");
const ytdl = require('ytdl-core');
const tokens = require('./token.json');





const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let Bot = function(token){
    let client = new Discord.Client();
    client.login(token).catch(err => {
    console.log(token + ` не смог залогиниться`);
	console.log("удали их из списка бот не будет работать");
  });
    
let idvoice = "";
let music_bot = false;

	
    client.on("ready", () => {
        console.log(`Bot  ${client.user.username} is ready!`);
        client.user.setActivity('vk.com/thebestshadow', { type: 'WATCHING' });
    });
	

	
	this.joinChannel = function(chnid) {
		idvoice = chnid;
           try {
 let channel = client.channels.get(chnid);
  channel.join()
 console.log(`Bot  ${client.user.username} - Вошёл успешно.`);
    } catch (err) {
    console.log(`Bot  ${client.user.username} - Не смог войти.`);
    }
}


this.sendChannel = function(chnid, message_content) {
	
           try {
 
  client.channels.get(chnid).send(message_content);
 console.log(`Bot  ${client.user.username} - Отправил успешно.`);
    } catch (err) {
    console.log(`Bot  ${client.user.username} - Не смог отсправить.` + err);
    }
}
this.joinServer = function(key) {
	  try {
	 var xhr = new XMLHttpRequest()

        xhr.open("POST", `https://discordapp.com/api/v6/invites/${key}?token=${token}`, true)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
        xhr.send()
	   console.log(`Bot  ${client.user.username} - Вошёл успешно.`);
	   } catch (err) {
    console.log(`Bot  ${client.user.username} - Не смог войти. - ${err}`);
    }
}
let dispatcher;
this.audioplay = async function (url_yt) {
 if(music_bot == true){   
const stream = ytdl(url_yt);
let channel = client.channels.get(idvoice);
await channel.join()
 .then(connection => {
            dispatcher = connection.playStream(stream);
 });
 console.log(`Bot  ${client.user.username} - играю музыку.`)
		}
		if(music_bot == false){ console.log(`Bot  ${client.user.username} - Модуль отключен`);}
}

this.audioplay_file = async function (file_music) {
 if(music_bot == true){   

let channel = client.channels.get(idvoice);
await channel.join()
 .then(connection => {
            dispatcher = connection.playFile(file_music);
 });
 console.log(file_music)
 console.log(`Bot  ${client.user.username} - играю музыку.`)
		}
		if(music_bot == false){ console.log(`Bot  ${client.user.username} - Модуль отключен`);}
}
 this.audiostop =  function () {
     
     if(dispatcher) dispatcher.end();

}
    this.setVolume = function(volume) {
		if(music_bot == true){
        if(dispatcher) dispatcher.setVolumeLogarithmic(volume);
		console.log(`Bot  ${client.user.username} - Громкость стоит - ${volume}`)
		}
		 if(music_bot == false){ console.log(`Bot  ${client.user.username} - Модуль отключен`);}
    }
	    this.music_turn = function() {
        if(music_bot == false){ music_bot = true; console.log(`Bot  ${client.user.username} - Модуль музыки включён`); return}
		 if(music_bot == true){ music_bot = false; console.log(`Bot  ${client.user.username} - Модуль музыки выключен`); return}
    }
	    this.music_status = function() {
        if(music_bot == false){  console.log(`Bot  ${client.user.username} - STATUS - Модуль музыки включён`); return}
		 if(music_bot == true){  console.log(`Bot  ${client.user.username} - STATUS - Модуль музыки выключен`); return}
    }
}



rl.on('line', (input, args) => {
    let inputs = input.split(' ');
  
if(inputs[0].toUpperCase() == "JOIN_SERVER") {
		let key = inputs[1];
		let delay_join = 1000;
        bots.forEach((bot)=>{
			
			setTimeout(function(){
           bot.joinServer(key);
		   }, delay_join);
        });
	}
	if(inputs[0].toUpperCase() == "MUSIC_TURN+1") {
		let botid = inputs[1];
       try {
           bots[botid].music_turn();
	   } catch(err) {
		   console.log("Ошибка");
	   }
      
	}
	    if(inputs[0].toUpperCase() == "VOLUME") {
        bots.forEach((bot)=>{
             bot.setVolume(inputs[1]);
        });
    }
	
			    if(inputs[0].toUpperCase() == "MUSIC_STATUS") {
        bots.forEach((bot)=>{
             bot.music_status();
        });
    }
		    if(inputs[0].toUpperCase() == "MUSIC_TURN") {
        bots.forEach((bot)=>{
             bot.music_turn();
        });
    }

    if(inputs[0].toUpperCase() == "VOICE") {
		let chnid = inputs[1];
        bots.forEach((bot)=>{
           bot.joinChannel(chnid);
		   
        });
		

	}
			 if(inputs[0].toUpperCase() == "VOICE+1") {
		let chnid = inputs[1];
		let botid = inputs[2];
       try {
           bots[botid].joinChannel(chnid);
	   } catch(err) {
		   console.log("Ошибка");
	   }
      
	}
	  if(inputs[0].toUpperCase() == "PLAY") {
		let url_yt = inputs[1];
        bots.forEach((bot)=>{
           bot.audioplay(url_yt);

        });
	}
		  if(inputs[0].toUpperCase() == "PLAY_FILE") {
		let url_yt = inputs[0];
						        let file_music = "";

        for(let i = 0; i < inputs.length; i++) {
            if(i > 1) {
                file_music += `${inputs[i]} `;
            }
        }
        bots.forEach((bot)=>{
           bot.audioplay_file(file_music);

        });
	}
	
		  if(inputs[0].toUpperCase() == "STOP") {
		
        bots.forEach((bot)=>{
           bot.audiostop();

        });
	}
	
	if(inputs[0].toUpperCase() == "SEND") {
		let chnid = inputs[1];
				        let message_content = "";

        for(let i = 0; i < inputs.length; i++) {
            if(i > 1) {
                message_content += `${inputs[i]} `;
            }
        }
        bots.forEach((bot)=>{
           bot.sendChannel(chnid, message_content);
        });
		
	}
	if(inputs[0].toUpperCase() == "SEND+1") {
		let chnid = inputs[1];
				        let message_content = "";

        for(let i = 1; i < inputs.length; i++) {
            if(i > 2) {
                message_content += `${inputs[i]} `;
            }
        }
           let botid = inputs[2];
           bots[botid].sendChannel(chnid, message_content);
      
		
	}
	});

let bots = [];
tokens.forEach(token=> {
bots.push(new Bot(token));
});




	
	
	
	
	