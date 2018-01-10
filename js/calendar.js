$("#addNew").click(function(){

	var date = $("#inputDate").val();
	var amount = parseFloat($("#inputStarterAmount").val()).toFixed(8);
	var index = parseFloat($("#inputIndex").val()).toFixed(2);

	var checkDate = $.trim($("#inputDate").val());
	var checkAmount = $.trim($("#inputStarterAmount").val());
	var checkIndex = $.trim($("#inputIndex").val());

	if (checkDate == "") {
		date = $("#tbody tr:first td:nth-child(1)").text();
	}

	if (checkAmount == "") {
		amount = $("#tbody tr:first td:nth-child(3)").text();
	}

	if (checkIndex == "") {
		index = $("#tbody tr:first td:nth-child(5)").text();
	}

	var max = parseFloat(amount * index).toFixed(8);
	var min = parseFloat(amount - (max - amount)).toFixed(8);

	var newRow = "<tr><td>" + date + "</td><td>" + amount + "</td><td>" + max + "</td><td>" + min + "</td><td>" + index + "</td></tr>";

	$("#tbody").prepend(newRow);

	$("#inputDate").val("");
	$("#inputStarterAmount").val("");
	$("#inputIndex").val("");
});

$("#userIcon").click(function(){
	$('#login').modal('show');
});

$("#registerDirection").click(function(){

	$('#login').modal('hide');
	$('#registerModal').modal('show');
});