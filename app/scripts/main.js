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

// Obj with the variables of the user and the total
var userSetting = {
	numOfDisp: 0,
	basicUser: 0,
	mediumUser: 0,
	highUser: 0,
	total: 0
};

// Number of disp
// I need to validate the max numOfDisp = 10 && the total is less than 250gb
var game = 0, smart = 0, laptop = 0, tv = 0;

// Calc the total usage of a family
var totalUsage = function(obj, data) {
	var total = (data[obj.numOfDisp -1].basic/100 * obj.basicUser +
				data[obj.numOfDisp -1].medium/100 * obj.mediumUser +
				data[obj.numOfDisp -1].high/100 * obj.highUser)*250;
	if(total > 250) {
		return 250;
	} else {
		return parseInt(total);
	}
};

$('.buttonToClick').on('click', function() {
	userSetting.numOfDisp += 1;
	userSetting.basicUser += 1;
	userSetting.mediumUser += 1;
	userSetting.highUser += 1;
	userSetting.total = totalUsage(userSetting, qOfUsers);
	$(this).children().text(userSetting.basicUser);
	console.log(userSetting.basicUser,userSetting.numOfDisp, userSetting.total);
});

// Document ready
// $(function() {}
