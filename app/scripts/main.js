/*global $:false */
'use strict';

// ---------- Calc of the total usage in GB from a family  ---------- //
var dataset= {
	// Table with % of each activitie per user profile
	charts: {
		basic: [1, 45, 25, 20, 5, 4, 0, 0],
		medium: [2, 10, 15, 20, 5, 5, 35, 8],
		high: [2, 10, 10, 10, 5, 5, 48, 10]
	},
	// Table Q of user and his % for profile
	qOfUsers: [
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
	],
	// Table with the max value (250gb) in GB and Q
	maxQ: {
		basic: [13107, 5120, 4864, 1280, 640, 0, 0],
		medium: [26214, 2389, 2176, 853, 1280, 114, 640],
		high: [26214, 1365, 1024, 469, 1920, 171, 1024]
	},
	maxGB: {
		basic: [3, 75, 95, 75, 3, 0, 0],
		medium: [5, 35, 43, 50, 5, 100, 13],
		high: [5, 20, 20, 28, 8, 150, 20]
	},
	// Conversion table in GB
	conversion: [0.000190735, 0.01464844, 0.00047684, 0.0585937, 0.00488281, 0.00390625 , 0.87890625, 0.01953125]
};

// Obj with the variables selected for the user and the total of the family
var userSetting = {
	numOfDisp: 4,
	basicUser: 1,
	mediumUser: 1,
	highUser: 0,
	total: 0,
	resultList: []
};

// Calc the total usage of a family in GB
var totalUsage = function(obj, data) {
	var disp = data[obj.numOfDisp -1];
	var total = (disp.basic/100 * obj.basicUser + disp.medium/100 * obj.mediumUser + disp.high/100 * obj.highUser)*250;
	// I validate if the total is less than 250gb
	return total > 250 ? 250 : Math.floor(total);
};

// Return a list of activies in base Q
var totalOfQ = function(total, data, type) {
	// var list = [];
	return console.log(total, data, type);
	// for(var i = 0; i < data.type.length; i++) {
	// 	list.push(Math.ceil(data.type[i] * (total/250)));
	// }
	// return list;
};

// Return a list of activies in base of the total of a family and the kind
var resultOfactivities = function(total, chart, conversion) {
	var list = [];
	for(var i = 0; i < chart.length; i++) {
		list.push(Math.ceil((chart[i]/100 * total) / conversion[i]));
	}
	return list;
};

userSetting.total = totalUsage(userSetting, dataset.qOfUsers);
userSetting.resultList = resultOfactivities(40, dataset.charts.basic, dataset.conversion);

$('.box-bar').each(function(i){
	//(2098 / 4352) * 100
	// var progress = Math.floor((userSetting.resultList[i] / dataset.third.medium[i]) * 100);
	// $(this).find('.progress-bar').css('width', progress + '%');
	$(this).find('.progress-bar').css('width', dataset.charts.basic[i] + '%');
 	$(this).find('.result-list').text(userSetting.resultList[i]);
 });

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

// Document ready
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('.step.second .selectorBox:first').css('margin-left', '11.5%');
	// $('.selectorBox').each(function(){
	// 	$('.selectorBox .pull-right').css('height', $(this).height());
	// });
});
