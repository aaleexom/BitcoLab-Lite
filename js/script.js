$("#copyBitsler1").click(function(){

	$("#bitsler1").select();
	document.execCommand('copy');
	document.getSelection().removeAllRanges();
});

$("#copyFreebitcoin1").click(function(){

	$("#freebitcoin1").select();
	document.execCommand('copy');
	document.getSelection().removeAllRanges();
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});