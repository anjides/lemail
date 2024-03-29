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
	, MailgunMailer = require('../modules/mailgun-mailer')
	, MultiMailer = require('../modules/multi-mailer')
	, validate = require('../modules/mailer').validate
	, Promise = require('bluebird')
	, _ = require('lodash')
	, log = require('../core/log').child({ module: 'api' })
	, config = require('../core/config');

var mandrillMailer = new MandrillMailer({ apiKey: config.mandrillApiKey })
	, mailgunMailer = new MailgunMailer(
		{ 	apiKey: config.mailgunApiKey,
			domain: config.mailgunDomain
		});

var mailers = [ mandrillMailer, mailgunMailer ];

var multiMailer = new MultiMailer({ mailers: mailers });

var create = function(req, res, next) {

	var message = req.body;

	var errors = validate(message);

	if (errors) {
		var err = new Error();
		err.message = errors;
		err.code = 400;
		return next(err);
	}

	multiMailer.send(message).then(function() {
		res.status(201).json({});
	}, next);
};

exports.create = create;
