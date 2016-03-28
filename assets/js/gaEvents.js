/* global $, ga */

/*
 * Send Google Analytics vote event
 * This event is fired with a type and context. It checks for the existance of
 * the `ga()` method on the window in order to prevent errors with ad-blockers.
 * @param type String The type of vote event to fire.
 * @param context String The context of the type of vote even fired.
 * @return Boolean Can be used to see if the event was fired properly.
 */
function gaVoteEvent (type, context) {
	if ('function' !== typeof window.ga) {
		return false;
	}
	ga('send', 'event', 'vote', type, context);
	return true;
}

/*
 * Send Optimizely track event
 * This event is fired with a type for the `trackEvent` method for Optimizely.
 * It handles the checking for the `optimizely` property on the window so only a
 * type needs to be supplied.
 * @param type String The type of event to pass to `optimizely#trackEvent`.
 */
function sendTrackEvent (type) {
	window.optimizely = window.optimizely || [];
	window.optimizely.push(['trackEvent', type]);
}

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
