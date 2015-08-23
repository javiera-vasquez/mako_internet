/*global $:false */
'use strict';
console.log("------------- main -------------");

// ---------- Dataset of a family  ---------- //

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
		{basic: 6, medium: 13, high: 30}
	],
	// Table with the max value (250gb) in GB and Q
	maxValues: {
		basic: {
			q: [13107, 5120, 4864, 1280, 640, 0, 0],
			gb: [3, 75, 95, 75, 3, 0, 0]
		},
		medium: {
			q: [26214, 2389, 2176, 853, 1280, 114, 640],
			gb: [5, 35, 43, 50, 5, 100, 13]
		},
		high: {
			q: [26214, 1365, 1024, 469, 1920, 171, 1024],
			gb: [5, 20, 20, 28, 8, 150, 20]
		}
	},
	// Conversion table in GB
	conversion: [0.000190735, 0.01464844, 0.00047684, 0.0585937, 0.00488281, 0.00390625 , 0.87890625, 0.01953125]
};

// Obj with the variables selected for the user and the total of the family
var userSetting = {
	numOfDisp: 4,
	basicUser: 2,
	mediumUser: 3,
	highUser: 0,
	total: 0,
	resultList: {}
};

// ---------- Calc of the total usage in GB & Q from a family  ---------- //

// Calc the total usage of a family in GB
var consumption = function(setting, qUsers) {
	var disp = qUsers[setting.numOfDisp -1];
	var total = (disp.basic/100 * setting.basicUser + disp.medium/100 * setting.mediumUser + disp.high/100 * setting.highUser)*250;
	// I validate if the total is less than 250gb
	return total > 250 ? 250 : Math.floor(total);
};

userSetting.total = consumption(userSetting, dataset.qOfUsers);
console.log('userSetting \n', userSetting);

// Return a list of activies in base of Q or GB
var totalUsage = function(setting, maxValues) {
	var list = {q: [], gb: []};
	var total = setting.total;
	var user;
	// dataset.maxValues = basic, medium, high
	if(setting.highUser > 0) {user = maxValues.high;}
	else if(setting.medium > 0) {user = maxValues.medium;}
	else {user = maxValues.basic;}
	// Construct the arrays
	for(var i = 0; i < user.q.length; i++) {
		list.q.push(Math.floor(user.q[i] * (total/250)));
		list.gb.push(Math.round((user.gb[i] * (total/250)) * 10 ) / 10);
	}
	return list;
};

userSetting.resultList = totalUsage(userSetting, dataset.maxValues);
console.log('resultList \n', userSetting.resultList);

// DEPRECATED
// Return a list of activies in base of the total of a family and the kind
// var resultOfactivities = function(total, chart, conversion) {
// 	var list = [];
// 	for(var i = 0; i < chart.length; i++) {
// 		list.push(Math.ceil((chart[i]/100 * total) / conversion[i]));
// 	}
// 	return list;
// };
// userSetting.resultList = resultOfactivities(40, dataset.charts.basic, dataset.conversion);

// Inject the q array in the DOM
$('.box-bar').each(function(i){
 	$(this).find('.result-list').text(userSetting.resultList.q[i]);
 });

// ---------- Devices and user profiles selector ---------- //
// Number of devices by kind & Number of Users by profile
var devices = [0, 0, 0, 0];
var userTypes = [['basicUser', 0], ['mediumUser', 0], ['highUser', 0]];

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
