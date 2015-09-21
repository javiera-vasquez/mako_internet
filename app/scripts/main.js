/* global $:false, console:false, familyData:false, dataset:false, updateGraph:false */

'use strict';
console.log('------------- main -------------');

// Number of devices by kind & Number of Users by profile
// var devices = [0, 0, 0, 0];
// var userTypes = [['basicUser', 0], ['mediumUser', 0], ['highUser', 0]];

// Info selected by the user about her family
var userSetting = {
	add: function(type, value) {
		if(type === 'device') {
			this.devices[value] += 1;
			// I validate if the total of devices is less than 10
			if(this.numOfDisp === undefined) {
				 this.numOfDisp = 1;
			} else if(this.numOfDisp < 10) {
				 this.numOfDisp += 1;
			}
		}
		if(type === 'profile') {
			var user = this.userTypes[value][0];
			this.userTypes[value][1] += 1;
			if(this[user] === undefined) {
				 this[user] = 1;
			} else if(this[user] < 7) {
				 this[user] += 1;
			}
			// console.log(this.userTypes[value], this[user]);
		}
		return;
	},
	remove: function(type, value) {
		if(type === 'device') {
			if(this.devices[value] > 0) {
				this.devices[value] -= 1;
			}
			// I validate if the total of devices is upper than 0
			if(this.numOfDisp > 0 && this.devices[value] < 10 ) {
				 this.numOfDisp -= 1;
			}
			return;
		}
		if(type === 'profile') {
			var user = this.userTypes[value][0];
			if(this.userTypes[value][1] > 0) {
				this.userTypes[value][1] -= 1;
			}
			if(this[user] > 0 && this.userTypes[value][1] < 7) {
				 this[user] -= 1;
			}
			return;
		}
	},
	defineProfile: function(status, value) {
		var types = ['basic', 'medium', 'high'];
		// If profile equal null
		if(status === 'add' && this.profile === undefined) {
			this.profile = types[value];
			return;
		}
		// else loop
		for(var i = 0; i < types.length; i++) {
			if(this.profile === types[i]) {
				// If user is upper to profile add user
				if(status === 'add' && i < value) {
					this.profile = types[value];
					return;
				}
				// If user is equal to profile
				if(status === 'remove' && i === value) {
					// console.log(i, value);
					// And user is upper to 0
					if(value > 0) {
						for(var b = i; b > 0; b--) {
							// console.log(b, i, b-1, value, this.userTypes[b-1][1]);
							if(this.userTypes[b-1][1] > 0) {
								this.profile = types[b-1];
								return;
							}
							// If the count is 0, return undefined
							if(b === 1) {
								this.profile = undefined;
								return;
							}
						}
					} else {
						// If user is 0, return undefined
						this.profile = undefined;
						return;
					}
				// Is user is lower to profile return the current profile
				} else {
					return this.profile;
				}
			}
		}
	},
	reset: function() {
		// all options to undefined
		for(var options in this) {
			// console.log(options, this[options]);
			if(typeof(this[options]) != 'function') {
				this[options] = undefined;
			}
		}
		// DOM values to cero
		this.devices = [0, 0, 0, 0];
		this.userTypes = [['basicUser', 0], ['mediumUser', 0], ['highUser', 0]];
		$('.profile, .devices').parent().find('.total').text(0);
		return;
	}
};

userSetting.reset();

// Add or delete a device of userSetting.numOfDisp
$('.devices').on('click', function() {
	var value = $(this).data('disp');
	// Change the values on the models
	if($(this).hasClass('more')) {
		userSetting.add('device', value);
	}
	if($(this).hasClass('less')) {
		userSetting.remove('device', value);
	}
	// Print the value to the user
	$(this).parent().find('.total').text(userSetting.devices[value]);
	// Print the graph
	if(userSetting.profile !== undefined) {
		familyData.createData(userSetting, dataset);
		updateGraph(familyData);
	}
	$('.step.second').removeClass('disable');
	// console.log(devices[value], userSetting.numOfDisp);
	event.preventDefault();
});

// Add or delete a device of userSetting.numOfDisp
$('.profile').on('click', function(){
	var value = $(this).data('user');
	var userValue = userSetting.userTypes[value][1];
	// Change the values for the models
	if($(this).hasClass('more')) {
		if(userValue === 0) {
			userSetting.defineProfile('add', value);
		}
		userSetting.add('profile', value);
	}
	if($(this).hasClass('less')) {
		if(userValue === 1) {
			userSetting.defineProfile('remove', value);
		}
		userSetting.remove('profile', value);
	}
	// Print the value to the user
	$(this).parent().find('.total').text(userSetting.userTypes[value][1]);
	// console.log(userSetting.profile, userSetting.profile === undefined);
	// Print the graph
	if(userSetting.profile === undefined) {
		$('.box-bar .result-list').text(0);
		updateGraph();
	} else {
		familyData.createData(userSetting, dataset);
		updateGraph(familyData);
		$('.box-bar').each(function(i){
			$(this).find('.result-list').text(familyData.list.q[i]);
		});
	}
	// console.log(userTypes[value][0], userTypes[value][1], userSetting[userTypes[value][0]]);
	event.preventDefault();
});

// Hover effect on the graph and replace data for any kind
$('.box-bar').hover(
	function(){
		if(userSetting.profile !== undefined) {
			$(this).addClass('active');
			updateGraph(familyData, [$(this).data('type'), $(this).data('index')]);
		}
	}, function() {
		if(userSetting.profile !== undefined) {
			$(this).removeClass('active');
			updateGraph(familyData);
		}
	}
);

// Reset the settings and thr graph
$('#reset .reset-graph').on('click', function(){
	updateGraph();
	userSetting.reset();
	$('.box-bar .result-list').text(0);
	event.preventDefault();
});

// Document ready
$(function() {
	$('.step.second .selectorBox:first').css('margin-left', '11.5%');
	$('.step.second').addClass('disable');
});


