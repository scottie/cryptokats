#!/usr/bin/env node
var cryptokittiesContrib = require("cryptokitties-contrib");
var ck = new cryptokittiesContrib();
var program = require('commander');
const chalk = require('chalk');

program
 .arguments('<command>')
 .option('-p, --price <price>', 'The max price to search under')
 .option('-f, --fancy <fancy>', 'True or false, search fancy kats?')
 .option('-t, --timer <timer>', 'Search every so many mili seconds, ie: 600000')

 .action(function(command) {
 	console.log("Command: " + command);
 	if(command == "scanner"){
 		if(program.timer < 10000){
 				console.log(chalk.red("[!]") + " Timer was to low, we dont wanna spam CryptoKitties, increased timer to 30 seconds..");
 			program.timer = 10000
 		};

		console.log("              .__....._             _.....__,");
		console.log("                 .x: o :':         ;': o :x.x");
		console.log("                 `. `-' .'.       .'. `-' .'   ");
		console.log("                   `---'             `---'  ");
		console.log("");
		console.log("         _...----...      ...   ...      ...----..._");
		console.log("      .-'__..-xx'----    `.  `x`  .'    ----'xx-..__`-.");
		console.log("     '.-'   _.--xxx'       `-._.-'       'xxx--._   `-.`");
		console.log("     '  .-x'                  :                  `.-.  `");
		console.log("       '   ..              _.'x'._              .'   .");
		console.log("             ..       ,.-'x       x'-.,       .'.");
		console.log("               ..                           ..");
		console.log("                 .-._                   _.-.");
		console.log("                     `x.--...___...--.x.");
		console.log("                   tradingview.com/u/console");


 		console.log("Scanner Activated");
 		console.log(chalk.black(chalk.bgYellow("=*=*=*=*=*=*=*=*=*=*=*=*")));
 		console.log("Kitties Under: " + program.price);
 		console.log("Fancy: " + program.fancy);
 		console.log(chalk.black(chalk.bgYellow("=*=*=*=*=*=*=*=*=*=*=*=*")));
 		findCats(program.price,program.fancy,program.timer);
 	}
 	else{
 		console.log(chalk.red("[x]") + " Please issue a command");
 	};
   
 })
 .parse(process.argv);
  
function underPrice(under, fancy){
		console.log(chalk.blue("[-]") + " Searching kitties: " + under + " | " + fancy);
		var g = "";
		var kit = ck.listAuctions(type = "sale", status="open", limit=999, offset=0);
		kit.then(function(val) {
		    var num = 0;
		    while(num <= 999 - 1){
		    	var price = val[num].current_price / 1000000000000000000;
	            if(parseFloat(price).toFixed(4) <= parseFloat(under).toFixed(4)){    
	                console.log(chalk.gray("Purrrrrrr...."));  
	            	if(val[num].kitty.is_fancy.toString() == fancy.toString()) {
		             	console.log(chalk.red("Price: ") + price);
			            console.log("https://www.cryptokitties.co/kitty/" + val[num].kitty.id);
			            console.log(chalk.green("ID: ") + val[num].kitty.id);
			            console.log(chalk.green("Fancy?: ") + val[num].kitty.is_fancy);
			            console.log(chalk.green("IMG: ") + val[num].kitty.image_url);
			            console.log(chalk.green("Name: ") + val[num].kitty.name);
			            console.log(chalk.green("Generation: ") + val[num].kitty.generation);
			            console.log(chalk.green("Color: ") + val[num].kitty.color);
			            console.log(chalk.green("Is Ready: ") + val[num].kitty.is_ready);
			            console.log(chalk.green("Cooldown Index: ") + val[num].kitty.status.cooldown_index);
			            console.log(chalk.green("Bun in over?: ") + val[num].kitty.is_gestating);
			            console.log(chalk.gray("__________________"));
			            //console.log(val[num])
			            console.log("");

			        };
	            };
	            num++;
		    };

		}).catch(function(err) {
		    //console.log(err);
		});
};

function findCats(price, fancy, refreshtime){
	console.log(chalk.red("[!]") + " Activating Scanner");
		
	var interval = setInterval(function () {underPrice(price, fancy); }, refreshtime);
	//underPrice(price, fancy);
};

/////////////