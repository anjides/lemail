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

var util = require('util')
	, request = require('superagent')
	, Promise = require('bluebird')
	, _ = require('lodash')
	, Mailer = require('../mailer')
	, log = require('../../core/log').child({ module: 'mandrill-mailer '});

var MailerOptions = {
	baseUrl: 'https://api.mailgun.net/v2'
};

/**
 * `MailgunMailer` constructor
 * 
 * The Mailgun mailer uses the Mailgun REST API (version 2) to send email
 * messages
 *
 * Options
 * - `apiKey`		Your Mailgun API key (required)
 * - `domain`		Domain that Mailgun will use to send your messages (required)
 * 
 * @param {Object} options
 * @api public
 */
var MailgunMailer = function(options) {
	options = _.extend({}, MailerOptions, options);

	if (!options.apiKey) {
		throw new Error('Missing required apiKey parameter!');
	}

	if (!options.domain) {
		throw new Error('Missing required domain parameter!');
	}

	Mailer.call(this, options);
};

util.inherits(MailgunMailer, Mailer);

/**
 * Send a plaintext e-mail message
 *
 * @param {Object} message
 * @return {Promise}
 * @api public
 */
MailgunMailer.prototype.send = function(message) {
	log.debug('sending message:', message);

	var deferred = Promise.defer();

	request
		.post(this.options.baseUrl + '/' + this.options.domain + '/messages')	
		.auth('api', this.options.apiKey)
		.type('form')	// will set Content-Type to application/x-www-form-urlencoded
		.send({
			subject: message.subject,
			text: message.text,
			from: message.from,
			to: message.to
		})
		.end(function(res) {
			if (!res.ok) {
				deferred.reject(new Error(res.text));
				return;
			}

			log.debug('successfully sent message:', res.body);
			deferred.resolve();
		});

	return deferred.promise;
};

module.exports = MailgunMailer;

