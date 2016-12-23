function setTooltip(btn, message) {
	$(btn).tooltip('hide')
		.attr('data-original-title', message)
		.tooltip('show');
}

function hideTooltip(btn) {
	setTimeout(function() {
		$(btn).tooltip('hide');
	}, 2000);
}
