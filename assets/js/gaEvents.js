// GA hooks for tracking voting registration conversions
$('#form-voting').on('click', function() {
	ga('send', 'event', 'vote', 'register', 'form');
	// Optimizely event support
	window['optimizely'] = window['optimizely'] || [];
	window.optimizely.push(["trackEvent", "voterSignup"]);
});
$('#online-voting').on('click', function() {
	ga('send', 'event', 'vote', 'register', 'online');
	// Optimizely event support
	window['optimizely'] = window['optimizely'] || [];
	window.optimizely.push(["trackEvent", "voterSignup"]);
});
$('#inperson-voting').on('click', function() {
	ga('send', 'event', 'vote', 'register', 'inperson');
	// Optimizely event support
	window['optimizely'] = window['optimizely'] || [];
	window.optimizely.push(["trackEvent", "voterSignup"]);
});

// GA hook for tracking whether the user selected a state
$('select').on('change', function() {
  var state = this.value;
  ga('send', 'event', 'vote', 'select', state);
	// Optimizely event support
	window['optimizely'] = window['optimizely'] || [];
	window.optimizely.push(["trackEvent", "stateSelect"]);
});