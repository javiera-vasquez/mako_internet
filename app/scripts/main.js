/* global $:false */
'use strict';
console.log('------------- main -------------');

// Number of devices by kind & Number of Users by profile
var devices = [0, 0, 0, 0];
var userTypes = [['basicUser', 0], ['mediumUser', 0], ['highUser', 0]];

// Info selected by the user about her family
var userSetting = {
	// profile: 'medium',
	devices: [0, 0, 0, 0],
	userTypes: [['basicUser', 1], ['mediumUser', 0], ['highUser', 0]],
	add: function(value, type) {

	},
	remove: function(value, type) {

	},
	editProfile: function(status, value) {
		var profile = this.profile;
		var types = ['basic', 'medium', 'high'];
		// If profile equal null
		if(status === 'add' && this.profile === undefined) {
			return this.profile = types[value];
		}
		// else loop
		for(var i = 0; i < types.length; i++) {
			if(profile === types[i]) {

				if(status === 'add' && i < value) {
					return this.profile = types[value];
				}

				if(status === 'remove' && i === value) {

					if(value > 0) {
						for(var b = i; b > 0; b--) {
							console.log(i, b-1, value);
							if(this.userTypes[b-1][1] > 0) {
								return this.profile = types[b-1];
							}
						}
					} else {
						return this.profile = undefined;
					}

				} else {
					return this.profile;
				}

			}
		}

	},
	reset: function() {

	}
}

// Add or delete a device of userSetting.numOfDisp
$('.devices').on('click', function() {
	event.preventDefault();
	// Read the data value from html
	var value = $(this).data('disp');
	// Change the values for the models
	if($(this).hasClass('more')) {
		devices[value] += 1;
		// I validate if the total of devices is less than 10
		if(userSetting.numOfDisp < 10) {
			userSetting.numOfDisp += 1;
		}
		if(userSetting.numOfDisp === undefined) {
			userSetting.numOfDisp = 1;
		}
	} else if($(this).hasClass('less')) {
		if(devices[value] > 0) {
			devices[value] -= 1;
		}
		// I validate if the total of devices is upper than 0
		if(userSetting.numOfDisp > 0 && devices[value] < 10 ) {
			userSetting.numOfDisp -= 1;
		}
	}
	// Print the value to the user
	$(this).parent().find('.total').text(devices[value]);
	// console.log(devices[value], userSetting.numOfDisp);
});

// Add or delete a device of userSetting.numOfDisp
$('.profile').on('click', function(){
	event.preventDefault();
	// Read the data value from html
	var value = $(this).data('user');
	var user = [userTypes[value][0]];
	console.log(value, user);
	// Change the values for the models
	if($(this).hasClass('more')){
		userTypes[value][1] += 1;
		if(userSetting[user] < 7) {userSetting[user] += 1;}
		if(userSetting[user] === undefined) {userSetting[user] = 1;}
	} else if($(this).hasClass('less')) {
		if(userTypes[value][1] > 0) {
			userTypes[value][1] -= 1;
		}
		if(userSetting[user] > 0 && userTypes[value][1] < 7) {
			userSetting[user] -= 1;
		}
	}
	// Print the value to the user
	$(this).parent().find('.total').text(userTypes[value][1]);
	// Call the raph method
	familyData.createData(userSetting, dataset);
	updateGraph(familyData);

	// console.log(userTypes[value][0], userTypes[value][1], userSetting[userTypes[value][0]]);
});

// Hover effect on the graph and replace data for any kind
$('.box-bar').hover(
	function(){
		$(this).addClass('active');
		updateGraph(familyData, [$(this).data('type'), $(this).data('index')]);
	}, function() {
		$(this).removeClass('active');
		updateGraph(familyData);
	}
);

// Reset the settings and thr graph
$('.reset-graph').on('click', function(){
	// Reset the model
	userSetting = {}
	devices = [0, 0, 0, 0];
	userTypes = [['basicUser', 0], ['mediumUser', 0], ['highUser', 0]];
	// Reset the DOM elements
	$('.profile, .devices').parent().find('.total').text(0);
	updateGraph();
	event.preventDefault();
});

// Document ready
$(function() {
	$('.step.second .selectorBox:first').css('margin-left', '11.5%');
	$('.box-bar').each(function(i){
	  // $(this).find('.result-list').text(familyData.list.q[i]);
	 });
});


