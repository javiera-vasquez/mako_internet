/*global $:false */
'use strict';

// ---------- Calc of the total usage in GB from a family  ---------- //
// Table Q of user and his % for profile
var qOfUsers = [
	{basic: 2, medium: 6, high: 12},
	{basic: 2, medium: 7, high: 14},
	{basic: 3, medium: 8, high: 16},
	{basic: 3, medium: 8, high: 18},
	{basic: 4, medium: 9, high: 20},
	{basic: 4, medium: 10, high: 22},
	{basic: 4, medium: 11, high: 24},
	{basic: 5, medium: 12, high: 26},
	{basic: 5, medium: 12, high: 28},
	{basic: 6, medium: 13, high: 30},
];

// Obj with the variables selected for the user and the total of the family
var userSetting = {
	numOfDisp: 0,
	basicUser: 0,
	mediumUser: 0,
	highUser: 0,
	total: 0
};

// Calc the total usage of a family
var totalUsage = function(obj, data) {
	var total = (data[obj.numOfDisp -1].basic/100 * obj.basicUser +
				data[obj.numOfDisp -1].medium/100 * obj.mediumUser +
				data[obj.numOfDisp -1].high/100 * obj.highUser)*250;
	// I validate if the var total is less than 250gb
	return total > 250 ? 250 : parseInt(total);
};

// ---------- Devices and user profiles selector ---------- //
// Number of devices by kind & Number of Users by profile
var devices = [0, 0, 0, 0],
	userTypes = [['basicUser', 0], ['mediumUser', 0], ['highUser', 0]];

// Add or delete a device of userSetting.numOfDisp
$('.devices').on('click', function() {
	var value = $(this).data('disp');
	if($(this).hasClass('more')) {
		devices[value] += 1;
		// I validate if the total of devices is less than 10
		if(userSetting.numOfDisp < 10) {userSetting.numOfDisp += 1;}
	} else if($(this).hasClass('less')) {
		if(devices[value] > 0) {devices[value] -= 1;}
		// I validate if the total of devices is upper than 0
		if(userSetting.numOfDisp > 0 && devices[value] < 10 ) {userSetting.numOfDisp -= 1;}
	}
	$(this).parent().find('.total').text(devices[value]);
	event.preventDefault();
	// console.log(devices[value], userSetting.numOfDisp);
});

// Add or delete a device of userSetting.numOfDisp
$('.profile').on('click', function(){
	var value = $(this).data('user');
	if($(this).hasClass('more')){
		userTypes[value][1] += 1;
		if(userSetting[userTypes[value][0]] < 7) {userSetting[userTypes[value][0]] += 1;}
	} else if($(this).hasClass('less')) {
		if(userTypes[value][1] > 0) {userTypes[value][1] -= 1;}
		if(userSetting[userTypes[value][0]] > 0 && userTypes[value][1] < 7) {userSetting[userTypes[value][0]] -= 1;}
	}
	$(this).parent().find('.total').text(userTypes[value][1]);
	event.preventDefault();
	// console.log(userTypes[value][0], userTypes[value][1], userSetting[userTypes[value][0]]);
});

// ----------

$('.buttonToClick').on('click', function() {
	userSetting.basicUser += 1;
	userSetting.total = totalUsage(userSetting, qOfUsers);
	// console.log(userSetting.basicUser,userSetting.numOfDisp, userSetting.total);
});

// Document ready
// $(function() {}
