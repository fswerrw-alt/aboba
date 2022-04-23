const Discord = require('discord.js-12');
const fs = require('fs');
const client = new Discord.Client();
const params = JSON.parse(fs.readFileSync("config.json", "utf8").toString());

const prefix = params.prefix;
const token = params.token;

client.on('ready', () => {
    console.log(`Started as ${client.user.tag}!`);
});

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function remove(word){
    let result = word;
    result = result.replace(`<@${client.user.id}>`, "");
    result = result.replace(`<@!${client.user.id}>`, "");
    if(!word.includes("http") || word.includes("<@")){
        result = result.replace("&", "");
    }
    if(!word.includes("http")){
        result = result.replace(".", " . ");
    }
    result = result.replace(",", " , ");
    if(!word.includes("http")){
        result = result.replace("?", " ? ");
    }
    if(!word.includes("<") && !word.includes("http")){
        result = result.replace(":", " : ");
    }
    if(!word.includes("<@")){
        result = result.replace("!", " ! ");
    }
    result = result.replace("\n", "%ENTER%");
    while(result.includes("  ")){
        result = result.replace("  ", " ");
    }
    result = result.replace("@everyone", "@еveryone");
    result = result.replace("@here", "@hеre");
    return result;
}

client.on('message', msg => {
    if(msg.author.id == client.user.id){
        return;
    }
    let wordlist = fs.readFileSync("words.txt", "utf8").toString();
    let newwords = remove(msg.content.toLowerCase());
    if(!newwords){
        return;
    }
    if(!newwords.replace(" ", "")){
        return;
    }
    fs.writeFileSync("words.txt", wordlist+newwords+" /|/ ", "utf-8");
    if(getRandomInt(0, 1000) < 50){
        let mass = fs.readFileSync("words.txt", "utf8").toString().split(" /|/ ");
        let words = mass[getRandomInt(0, mass.length-1)].split(" ");
        let debug = "";
        let mes = "";
        let i = 0;
        let word;
        while(words[i]){
            if(getRandomInt(1, 8) < 2){
                words = mass[getRandomInt(0, mass.length-1)].split(" ");
                i = getRandomInt(1, words.length)-1
            }
            word = words[i];
            mes += word+" ";
            i++;
        }
        mes = mes.replace(" %ENTER% ", "%ENTER%");
        mes = mes.replace("%ENTER%", "\n");
        mes = mes.replace(" .", ".");
        mes = mes.replace(" ,", ",");
        mes = mes.replace(" ?", "?");
        mes = mes.replace(" :", ":");
        mes = mes.replace(" !", "!");
        if(!mes){
            return;
        }
        if(getRandomInt(1, 10) > 9){
            mes = mes.toUpperCase()
        }
        try{
            msg.channel.send(mes).then(function(e){}).catch(function(e){});
        }catch(e){
            console.log(e)
        }
        console.log(debug);
    }
    if(msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)){
        let mass = fs.readFileSync("words.txt", "utf8").toString().split(" /|/ ");
        let words = mass[getRandomInt(0, mass.length-1)].split(" ");
        let debug = "";
        let mes = "";
        let i = 0;
        let word;
        while(words[i]){
            if(getRandomInt(1, 8) < 2){
                words = mass[getRandomInt(0, mass.length-1)].split(" ");
                i = getRandomInt(1, words.length)-1
            }
            word = words[i];
            mes += word+" ";
            i++;
        }
        mes = mes.replace(" %ENTER% ", "%ENTER%");
        mes = mes.replace("%ENTER%", "\n");
        mes = mes.replace(" .", ".");
        mes = mes.replace(" ,", ",");
        mes = mes.replace(" ?", "?");
        mes = mes.replace(" :", ":");
        mes = mes.replace(" !", "!");
        if(!mes){
            return;
        }
        if(getRandomInt(1, 10) > 9){
            mes = mes.toUpperCase()
        }
        try{
            msg.channel.send(mes).then(function(e){}).catch(function(e){});
        }catch(e){
            console.log(e)
        }
        console.log(debug);
    }

});

client.login(token);