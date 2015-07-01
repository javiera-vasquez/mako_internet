/*global $:false */
'use strict';

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

// Obj with the variables selected for the user and the total of the calc
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

// Number of devices
var devices = [0, 0, 0, 0];

// Add device to userSetting.numOfDisp
$('.devices').on('click', function() {
	var value = parseInt($('.buttonToClick').attr('value'));
	devices[value] += 1;
	$(this).children().text(devices[value]);
	// I validate if the total of devices is less than 10
	if(userSetting.numOfDisp < 10) {userSetting.numOfDisp += 1;}
	// console.log(devices[0], userSetting.numOfDisp)
});

$('.buttonToClick').on('click', function() {
	userSetting.basicUser += 1;
	userSetting.total = totalUsage(userSetting, qOfUsers);
	$(this).children().text(userSetting.basicUser);
	// console.log(userSetting.basicUser,userSetting.numOfDisp, userSetting.total);
});

// Document ready
// $(function() {}
