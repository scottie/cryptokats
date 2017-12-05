 //#!/usr/bin/env node
var cryptokittiesContrib = require("cryptokitties-contrib")
var ck = new cryptokittiesContrib();
var program = require('commander')
const chalk = require('chalk');

program
 .arguments('<command>')
 .option('-p, --price <price>', 'The max price to search under')
 .option('-f, --fancy <fancy>', 'True or false, search fancy kats?')
 .option('-t, --timer <timer>', 'Search every so many mili seconds, ie: 600000')

 .action(function(command) {
 	console.log("Command: " + command)
 	if(command == "scanner"){
 		if(program.timer < 10000){
 			console.log("[!] Timer was to low, we dont wanna spam CryptoKitties, increased timer to 30 seconds..")
 			program.timer = 10000
 		}

 		console.log("Scanner Activated");
 		console.log("=*=*=*=*=*=*=*=*=*=*=*=*")
 		console.log("Kitties Under: " + program.price);
 		console.log("Fancy: " + program.fancy)
 		console.log("=*=*=*=*=*=*=*=*=*=*=*=*")
 		findCats(program.price,program.fancy,program.timer);
 	}
 	else{
 		console.log("[x] Please issue a command...")
 	}
   
 })
 .parse(process.argv);
  

function underPrice(under, fancy){
		console.log("[-] Searching kitties: " + under + " | " + fancy);
		var g = ""
		var kit = ck.listAuctions(type = "sale", status="open", limit=999, offset=0)
		kit.then(function(val) {
		    var num = 0;
		    while(num <= 999 - 1){
		    	var price = val[num].current_price / 1000000000000000000;
	            if(price < under){       
	            	if(val[num].kitty.is_fancy.toString() == fancy.toString()) {
		             	console.log("Price: " + price)
			            console.log("https://www.cryptokitties.co/kitty/" + val[num].kitty.id)
			            console.log("ID: " + val[num].kitty.id)
			            console.log("Fancy?: " + val[num].kitty.is_fancy)
			            console.log("IMG: " + val[num].kitty.image_url)
			            console.log("Name: " + val[num].kitty.name)
			            console.log("__________~[[*]]~__________")
			            console.log("")
			        }
	            }
	            num++;
		    }

		}).catch(function(err) {
		    //console.log(err);
		});
};

function findCats(price, fancy, refreshtime){
	console.log("[!] Activating Scanner")
	var interval = setInterval(function () {underPrice(price, fancy); }, refreshtime);
	//underPrice(price, fancy);
};

/////////////