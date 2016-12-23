window.onload = function() {

	function initCovers() {

		var covers = document.getElementsByClassName("docs-cover");

		if(covers.length > 0) {
			for (var i = 0, len = covers.length; i < len; i++) {
				var color = covers[i].getAttribute('data-color');

				covers[i].id = 'docs-cover-' + i;
				particleCover('docs-cover-' + i, color);
			}
		}
	}

	initCovers();

	var clipboard = new Clipboard('.ui-copy-button');

	$('.ui-copy-button').tooltip({
		trigger: 'click',
		placement: 'bottom'
	});

	clipboard.on('success', function(e) {
		setTooltip(e.trigger, 'Copied!');
		hideTooltip(e.trigger);
	});

	clipboard.on('error', function(e) {
		setTooltip(e.trigger, 'Press CMD+C');
		hideTooltip(e.trigger);
	});
};