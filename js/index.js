var startedAutoRoll = false;
var maxWinChance = 95;
var maxRollNumbers = 10000;

var winChanceValue = 47.50;
var winChanceValueFix = 47.50;
var payoutValue = 2.00;
var payoutValueFix = 2.00;
var betAmountValue = 0.00000001;
var betAmountValueFix = 0.00000001;
var winProfitValue = 0.00000001;

var btcCounter = 0.00000000;

var lower = 4750;
var lowerFix = 4750;
var higher = 5250;
var higherFix = 5250;

var betTo = "Auto";

var betCount = 0;
var lastBet = "Hi";
var resultCounter = false;

var prevAmount = parseFloat(0.00000000).toFixed(8);
var winLoseAmount = parseFloat(0.00000000).toFixed(8);
var afterAmount = parseFloat(0.00000000).toFixed(8);
var plusMinus = "+";

//Variables de probabilidad
var porcentajePerdidas;
var porcentajeRealPerdidas;
var porcentajeExtraPerdidas;
var valorInicial;
var montoApuesta;
var perdidasNecesarias = 0;

var totalRoll = 0;
var totalWinRoll = 0;
var totalLoseRoll = 0;

var winChancePercentage = 0;

var starterCoins = parseFloat(0.00000000).toFixed(8);
var actualCoins = parseFloat(0.00000000).toFixed(8);
var coinsVariation = parseFloat(0.00000000).toFixed(8);
var exceededAmount = 0;

var maxWin;
var maxLose;

var trueOrFalse = true;

var profit = parseFloat($("#profitBet").val()).toFixed(2);
var starterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
var maxObjective = parseFloat(starterAmount * profit).toFixed(8);
var minObjective = parseFloat(starterAmount - (maxObjective - starterAmount)).toFixed(8);

function rndBet(){
	var randomBet = Math.floor(Math.random() * (1 + 1));
	var rndBetResult = "Hi";
	if (randomBet == 0) {
		rndBetResult = "Hi";
	}
	else if (randomBet == 1) {
		rndBetResult = "Lo";
	}
	return rndBetResult;
}

function checkHi(i){
	if (i > higherFix) {
		plusMinus = "+";
		return true;
	}
	else {
		plusMinus = "-";
		return false;
	}
}

function checkLo(i){
	if (i < lowerFix) {
		plusMinus = "+";
		return true;
	}
	else {
		plusMinus = "-";
		return false;
	}
}

function roll(){
	prevAmount = parseFloat($("#btcCounter").text()).toFixed(8);

	var localLastBet = lastBet;
	var localResultCounter = resultCounter;
	var x = Math.floor(Math.random() * 10000);
	trueOrFalse = true;
	if (betTo) {
		if (betTo == "Hi") {
			var betVar = "Hi";
			lastBet = "Hi";
		}
		else if (betTo == "Lo"){
			var betVar = "Lo";
			lastBet = "Lo";
		}
		else{
			var betVar = rndBet();
			lastBet = betVar;
		}
	}

	if (betVar == "Hi"){
		trueOrFalse = checkHi(x);
		resultCounter = trueOrFalse;
	}
	else if(betVar == "Lo"){
		trueOrFalse = checkLo(x);
		resultCounter = trueOrFalse;
	}

	if((localResultCounter == resultCounter) && (localLastBet == lastBet)){
		betCount = betCount + 1;
	}
	else {
		betCount = 1;
	}

	var xLength = x.toString().length;
	if(xLength == 1){
		x = "0000" + x;
	}
	else if (xLength == 2){
		x = "000" + x;
	}
	else if (xLength == 3){
		x = "00" + x;
	}
	else if (xLength == 4){
		x = "0" + x;
	}
	$("#rndNumber").text(x);

	if (trueOrFalse == true) {
		$("#btcCounter").text(addCoins);
		afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
		$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-success bgSuccessBorder leftRadius\">¡Has ganado!</span><span class=\"px-3 py-1 bgSuccessBorder text-center rightRadius\">" + betCount + "</span>");
		var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-success\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
	}
	else {
		$("#btcCounter").text(removeCoins);
		afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
		$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-danger bgDangerBorder leftRadius\">Has perdido...</span><span class=\"px-3 py-1 bgDangerBorder text-center rightRadius\">" + betCount + "</span>");
		var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-danger\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
	}
	$("#tbody").prepend(text);
	if (parseInt($("#tbody tr").length) > 500){
		$("#tbody tr:nth-last-child(-n+400)").remove();
	}
	console.log(parseInt($("#tbody tr").length));
}

function autoRoll(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var betAmountCounter = $("#betAmount").val();
	var betAmountCounterFix = parseFloat(betAmountCounter);

	if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
		var delay = $("#msDelay").val();

		if (startedAutoRoll == true){
			roll();
			setTimeout(autoRoll, delay);
		}
	}
	else {
		$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
		switchAuto();
	}
}

function autoRollSTR1(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var betAmountCounter = $("#betAmount").val();
	var betAmountCounterFix = parseFloat(betAmountCounter);
	var cantidadSiPerdida = parseFloat((parseFloat($("#btcCounter").text()).toFixed(8)) - (parseFloat($("#betAmount").val()).toFixed(8))).toFixed(8);

	if ( (parseFloat(pocketBTC).toFixed(8)) >= maxWin ){
		alert("¡Meta conseguida!");
		switchAuto();
	} 
	else {
		if ( (parseFloat(cantidadSiPerdida).toFixed(8)) >= maxLose ){
			if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
				var delay = $("#msDelay").val();

				if (startedAutoRoll == true){
					montoApuesta = parseFloat($("#betAmount").val()).toFixed(8);
					valorInicial = parseFloat($("#btcCounter").text()).toFixed(8);
					porcentajeExtraPerdidas = (montoApuesta / valorInicial) * 100;
					porcentajePerdidas = parseFloat(100).toFixed(2) - parseFloat($("#winChance").val()).toFixed(2);
					porcentajeRealPerdidas = parseFloat(porcentajePerdidas + porcentajeExtraPerdidas).toFixed(2);
					var porcentajeCalc = parseFloat(porcentajeRealPerdidas).toFixed(2);

					if (perdidasNecesarias == 0){
						while (porcentajeCalc > 1){
							porcentajeCalc = porcentajeCalc * (porcentajeRealPerdidas / 100);
							perdidasNecesarias++;
						}
					}

					roll();

					totalRoll++;
					if(resultCounter == true){
						totalWinRoll++;
					}
					else if (resultCounter == false){
						totalLoseRoll++;
					}

					winChancePercentage = parseFloat((totalWinRoll / totalRoll) * 100).toFixed(2);
					$("#winPercent1").text(winChancePercentage + "%"); 

					actualCoins = parseFloat($("#btcCounter").text()).toFixed(8);
					coinsVariation = parseFloat(actualCoins - starterCoins).toFixed(8);

					if (coinsVariation > parseFloat(0.00000000).toFixed(8)){
						$("#variationCoins").html("<b class=\"text-success\">+" + coinsVariation + "</b>");
					} 
					else if (coinsVariation < parseFloat(0.00000000).toFixed(8)){
						$("#variationCoins").html("<b class=\"text-danger\">" + coinsVariation + "</b>");
					} 
					else if (coinsVariation == parseFloat(0.00000000).toFixed(8)){
						$("#variationCoins").html("<b>" + coinsVariation + "</b>");
					}

					//alert ("Perdidas necesarias: " + perdidasNecesarias);
					if ((betCount >= perdidasNecesarias) && (resultCounter == false)){
						console.log("Has llegado a las " + betCount + " veces perdidas.");
						if ((exceededAmount % 3) == 0){
							x2();
						}
						exceededAmount++;
					} else if (resultCounter == true){
						exceededAmount = 0;
						min();
					}

					//console.log(resultCounter);

					setTimeout(autoRollSTR1, delay);
				}
			}
			else {
				$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
				switchAuto();
			}
		}
		else {
			alert("El juego se ha pausado debido a que has rebasado el límite de pérdidas.");
			switchAuto();
		}
	}
}

function autoRollSTR2(){

	if (betCount < 2){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var betAmountCounter = $("#betAmount").val();
		var betAmountCounterFix = parseFloat(betAmountCounter);

		if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
			var delay = $("#msDelay").val();

			if (startedAutoRoll == true){
				roll();
				setTimeout(autoRollSTR2, delay);
			}
		}
		else {
			$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
			switchAuto();
		}
	} else if(betCount >= 2) {
		if (trueOrFalse == false) {
			//alert("Objetivo encontrado");
			max();
			var actualToBet = $("#betAmount").val();
			actualToBet = actualToBet / 2;
			$("#betAmount").val(parseFloat(actualToBet).toFixed(8));
			var pocketBTC = $("#btcCounter").text();
			var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
			var betAmountCounter = $("#betAmount").val();
			var betAmountCounterFix = parseFloat(betAmountCounter);

			if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
				var delay = $("#msDelay").val();

				if (startedAutoRoll == true){
					roll();
				}
			}
			else {
				$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
				switchAuto();
			}
			setTimeout(returnAutoRollSTR2, delay);
		}
		else {
			var pocketBTC = $("#btcCounter").text();
			var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
			var betAmountCounter = $("#betAmount").val();
			var betAmountCounterFix = parseFloat(betAmountCounter);

			if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
				var delay = $("#msDelay").val();

				if (startedAutoRoll == true){
					roll();
					setTimeout(autoRollSTR2, delay);
				}
			}
			else {
				$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
				switchAuto();
			}
		}
	}
}

function returnAutoRollSTR2(){
	var actualBTCAmount = parseFloat($("#btcCounter").text()).toFixed(8);
	betTo = "Hi";
	$("#msDelay").val(parseInt(0));
	changePayout(1.06);
	min();
	if (actualBTCAmount <= minObjective){
		alert("Has llegado al límite de pérdidas.\nDeteniendo el script...");
	}
	else if (actualBTCAmount >= maxObjective){
		alert ("¡Enhorabuena, has logrado tu meta!\nDeteniendo el script...");
	} else {
		autoRollSTR2();
	}
}


function addCoins(){
	var actualBTC = $("#btcCounter").text();
	var actualBTCFix = parseFloat(actualBTC);
	var addedBTC = $("#winProfit").text();
	var addedBTCFix = parseFloat(addedBTC);
	winLoseAmount = parseFloat(addedBTCFix).toFixed(8);
	var totalBTC = parseFloat(actualBTCFix + addedBTCFix).toFixed(8);
	//alert("BTC antes de ganar: " + actualBTCFix + "\nCantidad ganada: " + addedBTCFix + "\nCantidad total: " + totalBTC);
	return totalBTC;
}

function removeCoins(){
	var actualBTC = $("#btcCounter").text();
	var actualBTCFix = parseFloat(actualBTC);
	var removedBTC = $("#betAmount").val();
	var removedBTCFix = parseFloat(removedBTC);
	winLoseAmount = parseFloat(removedBTCFix).toFixed(8);
	var totalBTC = parseFloat(actualBTCFix - removedBTCFix).toFixed(8);
	//alert("BTC antes de perder: " + actualBTCFix + "\nCantidad perdida: " + addedBTCFix + "\nCantidad total: " + totalBTC);
	return totalBTC;
}

function switchAuto(){
	if (startedAutoRoll == false){
		startedAutoRoll = true;
		$("#start").html("<i class=\"fas fa-pause fa-2x\">");
	}
	else {
		startedAutoRoll = false;
		$("#start").html("<i class=\"fas fa-play fa-2x\">");
		perdidasNecesarias = 0;
	}
	return startedAutoRoll;
}

function updateFromWinChance(){
	alert("Holi");
}

function x2(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var inputBTC = $("#betAmount").val();
	var inputBTCFix = parseFloat(inputBTC);
	var x2BTC = inputBTCFix * 2;
	var x2BTCFix = parseFloat(x2BTC).toFixed(8);
	
	if (pocketBTCFix >= x2BTCFix){
		$("#betAmount").val(x2BTCFix);

		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		winProfitValue = (x2BTCFix * payoutValueFix) - x2BTCFix;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);
	}
	else {
		$("#betAmount").val(pocketBTCFix);
		$("#winProfit").text(pocketBTCFix);
	}
}

function d2(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var inputBTC = $("#betAmount").val();
	var inputBTCFix = parseFloat(inputBTC);
	var x2BTC = inputBTCFix / 2;
	var x2BTCFix = parseFloat(x2BTC).toFixed(8);
	
	if (pocketBTCFix >= x2BTCFix){
		$("#betAmount").val(x2BTCFix);

		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		winProfitValue = (x2BTCFix * payoutValueFix) - x2BTCFix;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);
	}
	else {
		$("#betAmount").val(pocketBTCFix);
		$("#winProfit").text(pocketBTCFix);
	}
}

function min(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var inputBTC = $("#betAmount").val();
	var inputBTCFix = parseFloat(inputBTC);
	var minValue = parseFloat(0.00000001).toFixed(8);

	if (pocketBTCFix >= 0.00000001){
		$("#betAmount").val(minValue);

		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		winProfitValue = (minValue * payoutValueFix) - minValue;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);
	} else {
		$("#betAmount").val(parseFloat(0.00000000).toFixed(8));
		$("#winProfit").text(parseFloat(0.00000000).toFixed(8));
	}
}

function max(){
	var pocketBTC = $("#btcCounter").text();
	var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
	var inputBTC = $("#betAmount").val();
	var inputBTCFix = parseFloat(inputBTC);
	var maxValue = pocketBTCFix;

	$("#betAmount").val(maxValue);
	
	payoutValue = $("#payout").val();
	payoutValueFix = parseFloat(payoutValue).toFixed(2);

	winProfitValue = (maxValue * payoutValueFix) - maxValue;
	winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
	$("#winProfit").text(winProfitValueFix);
}

function changePayout(payout){
	var payVal = parseFloat(payout).toFixed(2);
	$("#payout").val(parseFloat(payVal).toFixed(2));
	payoutValue = $("#payout").val();
	payoutValueFix = parseFloat(payoutValue).toFixed(2);

	if (payoutValueFix > 4750){
		payoutValueFix = parseFloat(4750).toFixed(2);
	}
	else if(payoutValueFix < 1){
		payoutValueFix = parseFloat(1).toFixed(2);
	}
	$("#payout").val(payoutValueFix);

	betAmountValue = $("#betAmount").val();

	winChanceValue = maxWinChance / payoutValueFix;
	winChanceValueFix = parseFloat(winChanceValue).toFixed(2);
	$("#winChance").val(winChanceValueFix);

	winProfitValue = (betAmountValue * payoutValueFix) - betAmountValue;
	winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
	$("#winProfit").text(winProfitValueFix);

	lower = maxRollNumbers * (winChanceValueFix/100);
	lowerFix = parseInt(lower);
	$("#lower").text(lowerFix);
	higher = maxRollNumbers - lower;
	higherFix = parseInt(higher);
	$("#higher").text(higherFix);
}



$(document).ready(function(){

	var shownAuto = false;

	$("#autoRollBody").hide();

	$("#btnHi").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var betAmountCounter = $("#betAmount").val();
		var betAmountCounterFix = parseFloat(betAmountCounter);

		if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
			var localLastBet = lastBet;
			var localResultCounter = resultCounter;
			var x = Math.floor(Math.random() * 10000);
			trueOrFalse = true;
			lastBet = "Hi";
			var betVar = "Hi";
			trueOrFalse = checkHi(x);
			resultCounter = trueOrFalse;

			if((localResultCounter == resultCounter) && (localLastBet == lastBet)){
				betCount = betCount + 1;
			}
			else {
				betCount = 1;
			}

			var xLength = x.toString().length;
			if(xLength == 1){
				x = "0000" + x;
			}
			else if (xLength == 2){
				x = "000" + x;
			}
			else if (xLength == 3){
				x = "00" + x;
			}
			else if (xLength == 4){
				x = "0" + x;
			}
			$("#rndNumber").text(x);

			if (trueOrFalse == true) {
				$("#btcCounter").text(addCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-success bgSuccessBorder leftRadius\">¡Has ganado!</span><span class=\"px-3 py-1 bgSuccessBorder text-center rightRadius\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-success\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			else {
				$("#btcCounter").text(removeCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-danger bgDangerBorder leftRadius\">Has perdido...</span><span class=\"px-3 py-1 bgDangerBorder text-center rightRadius\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-danger\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			$("#tbody").prepend(text);
		}
		else {
			$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
		}
	});

	$("#btnLo").click(function(){
		var pocketBTC = $("#btcCounter").text();
		var pocketBTCFix = parseFloat(pocketBTC).toFixed(8);
		var betAmountCounter = $("#betAmount").val();
		var betAmountCounterFix = parseFloat(betAmountCounter);

		if ((pocketBTCFix > 0.00000000) && (pocketBTCFix >= betAmountCounterFix)){
			var localLastBet = lastBet;
			var localResultCounter = resultCounter;
			var x = Math.floor(Math.random() * 10000);
			trueOrFalse = true;
			lastBet = "Lo";
			var betVar = "Lo";
			trueOrFalse = checkLo(x);
			resultCounter = trueOrFalse;

			if((localResultCounter == resultCounter) && (localLastBet == lastBet)){
				betCount = betCount + 1;
			}
			else {
				betCount = 1;
			}

			var xLength = x.toString().length;
			if(xLength == 1){
				x = "0000" + x;
			}
			else if (xLength == 2){
				x = "000" + x;
			}
			else if (xLength == 3){
				x = "00" + x;
			}
			else if (xLength == 4){
				x = "0" + x;
			}
			$("#rndNumber").text(x);

			if (trueOrFalse == true) {
				$("#btcCounter").text(addCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-success bgSuccessBorder leftRadius\">¡Has ganado!</span><span class=\"px-3 py-1 bgSuccessBorder text-center rightRadius\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-success\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			else {
				$("#btcCounter").text(removeCoins);
				afterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
				$("#msgTrueFalse").html("<span class=\"py-1 px-5 bg-danger bgDangerBorder leftRadius\">Has perdido...</span><span class=\"px-3 py-1 bgDangerBorder text-center rightRadius\">" + betCount + "</span>");
				var text = "<tr><td scope=\"row\" class=\"bg-dark text-white\" id=\"bet\">" + betVar + "</td><td class=\"roll\">" + x + "</td><td class=\"winLose\"><b class=\"text-danger\">" + plusMinus + winLoseAmount + "</b></td><td class=\"previousAmount\">" + prevAmount + "</td><td class=\"laterAmount\">" + afterAmount + "</td></tr>";
			}
			$("#tbody").prepend(text);
		}
		else {
			$("#msgTrueFalse").html("<p class=\"py-1\">No tienes suficiente dinero en el monedero.</p>");
		}
	});

	$("#autoRoll").click(function(){
		if (shownAuto == false){
			shownAuto = true;
			$("#autoRollBody").show();
		}
		else {
			shownAuto = false;
			$("#autoRollBody").hide();
		}
	});

	$("#start").click(function(){
		switchAuto();
		autoRoll();
	});

	$("#winChance").change(function(){
		winChanceValue = $("#winChance").val();
		winChanceValueFix = parseFloat(winChanceValue).toFixed(2);

		if (winChanceValueFix > 95){
			winChanceValueFix = parseFloat(95).toFixed(2);
		}
		else if(winChanceValueFix < 0.02){
			winChanceValueFix = parseFloat(0.02).toFixed(2);
		}
		$("#winChance").val(winChanceValueFix);

		betAmountValue = $("#betAmount").val();

		payoutValue = maxWinChance / winChanceValueFix;
		payoutValueFix = parseFloat(payoutValue).toFixed(2);
		$("#payout").val(payoutValueFix);

		winProfitValue = (betAmountValue * payoutValueFix) - betAmountValue;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);

		lower = maxRollNumbers * (winChanceValueFix/100);
		lowerFix = parseInt(lower);
		$("#lower").text(lowerFix);
		higher = maxRollNumbers - lower;
		higherFix = parseInt(higher);
		$("#higher").text(higherFix);
	});

	$("#payout").change(function(){
		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		if (payoutValueFix > 4750){
			payoutValueFix = parseFloat(4750).toFixed(2);
		}
		else if(payoutValueFix < 1){
			payoutValueFix = parseFloat(1).toFixed(2);
		}
		$("#payout").val(payoutValueFix);

		betAmountValue = $("#betAmount").val();

		winChanceValue = maxWinChance / payoutValueFix;
		winChanceValueFix = parseFloat(winChanceValue).toFixed(2);
		$("#winChance").val(winChanceValueFix);

		winProfitValue = (betAmountValue * payoutValueFix) - betAmountValue;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);

		lower = maxRollNumbers * (winChanceValueFix/100);
		lowerFix = parseInt(lower);
		$("#lower").text(lowerFix);
		higher = maxRollNumbers - lower;
		higherFix = parseInt(higher);
		$("#higher").text(higherFix);
	});

	$("#betAmount").change(function(){
		betAmountValue = $("#betAmount").val();
		betAmountValueFix = parseFloat(betAmountValue).toFixed(8);
		$("#betAmount").val(betAmountValueFix);

		payoutValue = $("#payout").val();
		payoutValueFix = parseFloat(payoutValue).toFixed(2);

		winProfitValue = (betAmountValueFix * payoutValueFix) - betAmountValueFix;
		winProfitValueFix = parseFloat(winProfitValue).toFixed(8);
		$("#winProfit").text(winProfitValueFix);
	});

	$("#autoHi").click(function(){
		if (betTo != "Hi") {
			$("#autoHi").removeClass("bg-primary");
			$("#autoHi").addClass("bg-primary-selected");
			$("#autoAuto").removeClass("bg-primary-selected");
			$("#autoAuto").addClass("bg-primary");
			$("#autoLo").removeClass("bg-primary-selected");
			$("#autoLo").addClass("bg-primary");
			betTo = "Hi";
		}
	});

	$("#autoAuto").click(function(){
		if (betTo != "Auto") {
			$("#autoHi").removeClass("bg-primary-selected");
			$("#autoHi").addClass("bg-primary");
			$("#autoAuto").removeClass("bg-primary");
			$("#autoAuto").addClass("bg-primary-selected");
			$("#autoLo").removeClass("bg-primary-selected");
			$("#autoLo").addClass("bg-primary");
			betTo = "Auto";
		}
	});

	$("#autoLo").click(function(){
		if (betTo != "Lo") {
			$("#autoHi").removeClass("bg-primary-selected");
			$("#autoHi").addClass("bg-primary");
			$("#autoAuto").removeClass("bg-primary-selected");
			$("#autoAuto").addClass("bg-primary");
			$("#autoLo").removeClass("bg-primary");
			$("#autoLo").addClass("bg-primary-selected");
			betTo = "Lo";
		}
	});

	$("#x2").click(function(){
		x2();
	});

	$("#d2").click(function(){
		d2();
	});

	$("#minCoins").click(function(){
		min();
	});

	$("#maxCoins").click(function(){
		max();
	});

	$("#str1").click(function(){
		totalRoll = 0;
		totalWinRoll = 0;
		totalLoseRoll = 0;
		betTo = "Hi";
		starterCoins = parseFloat($("#btcCounter").text()).toFixed(8);
		maxWin = parseFloat(starterCoins * 1.3).toFixed(8);
		maxLose = parseFloat(starterCoins * 0.7).toFixed(8);
		switchAuto();
		autoRollSTR1();
	});

	$("#str2").click(function(){
		profit = parseFloat($("#profitBet").val()).toFixed(2);
		starterAmount = parseFloat($("#btcCounter").text()).toFixed(8);
		maxObjective = parseFloat(starterAmount * profit).toFixed(8);
		minObjective = parseFloat(starterAmount - (maxObjective - starterAmount)).toFixed(8);
		switchAuto();
		returnAutoRollSTR2();
	});
});