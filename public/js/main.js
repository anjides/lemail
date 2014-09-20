'use strict';

$(document).ready(function() {
	$('#sendEmailForm').submit(function() {
		var posting = $.ajax({
			type: 'POST',
			url: '/v1/messages',
			data: JSON.stringify({
				from: this.from.value,
				to: this.to.value,
				subject: this.subject.value,
				text: this.text.value
			}),
			contentType: "application/json; charset=utf-8",			
			dataType: 'json'
		});

		posting.done(function() {
			$('#errorAlert').hide();
			$('#successAlert').show();
		});

		posting.fail(function() {
			$('#errorAlert').show();
			$('#successAlert').hide();			
		});

		return false;
	});
});
