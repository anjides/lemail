// Copyright (c) 2014 Eugene Yaroslavtsev

// Permission to use, copy, modify, and/or distribute this software for any purpose
// with or without fee is hereby granted, provided that the above copyright notice
// and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.

'use strict';

var MandrillMailer = require('../modules/mandrill-mailer')
	, log = require('../core/log').child({ module: 'api' })
	, config = require('../core/config');

var mandrillMailer = new MandrillMailer({ apiKey: config.mandrillApiKey });

var create = function(req, res, next) {
	// send message
	mandrillMailer.send({ subject: 'Herp', text: 'Derp', fromEmail: 'exhaze@gmail.com', toEmail: 'exhaze@gmail.com' })
	.then(function() {
		res.status(201).json({});
	}, next);
};

exports.create = create;
