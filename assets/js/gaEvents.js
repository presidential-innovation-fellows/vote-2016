// GA hooks for tracking voting registration conversions
//
$('#form-voting').on('click', function() {
	gaVoteEvent('register', 'form');
	// Optimizely event support
	sendTrackEvent('voterSignup');
});
$('#online-voting').on('click', function() {
	gaVoteEvent('register', 'online');
	// Optimizely event support
	sendTrackEvent('voterSignup');
});
$('#inperson-voting').on('click', function() {
	gaVoteEvent('register', 'inperson');
	// Optimizely event support
	sendTrackEvent('voterSignup');
});

// GA hook for tracking whether the user selected a state
$('select').on('change', function() {
  var state = this.value;
  gaVoteEvent('select', state);
	// Optimizely event support
	sendTrackEvent('stateSelect');
});
