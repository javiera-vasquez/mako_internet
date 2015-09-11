/* global $:false */
'use strict';
console.log('------------- main -------------');

// ---------- Dataset cals ---------- //
// var kind = ['mail', 1]

// Info selected by the user about her family
var userSetting = {
	numOfDisp: 5,
	basicUser: 2,
	mediumUser: 1,
	highUser: 1,
	profile: 'medium'
};

familyData.createData(userSetting, dataset);

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

// Hover effect over lateral nav
$('.box-bar').hover(
	function(){
		$(this).addClass('active');
		update(familyData, [$(this).data('type'), $(this).data('index')]);
	}, function() {
		$(this).removeClass('active');
		update(familyData);
	}
);


// Document ready
$(function() {
	$('.step.second .selectorBox:first').css('margin-left', '11.5%');
	$('.box-bar').each(function(i){
	  $(this).find('.result-list').text(familyData.list.q[i]);
	 });
});


