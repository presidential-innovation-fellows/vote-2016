// GA hooks for tracking voting registration conversions
$('#form-voting').on('click', function() {
  ga('send', 'event', 'vote', 'register', 'form');
});
$('#online-voting').on('click', function() {
  ga('send', 'event', 'vote', 'register', 'online');
});
$('#inperson-voting').on('click', function() {
  ga('send', 'event', 'vote', 'register', 'inperson');
});