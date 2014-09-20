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
	, Mailer = require('../mailer').Mailer
	, log = require('../../core/log').child({ module: 'mandrill-mailer '});

var MailerOptions = {
	baseUrl: 'https://mandrillapp.com/api/1.0'
};

/**
 * `MandrillMailer` constructor
 * 
 * The Mandrill mailer uses the Mandrill REST API (version 1.0) to send email
 * messages
 *
 * Options
 * - `apiKey`		Your Mandrill API key (required)
 * 
 * @param {Object} options
 * @api public
 */
var MandrillMailer = function(options) {
	options = _.extend({}, MailerOptions, options);

	if (!options.apiKey) {
		throw new Error('Missing required apiKey parameter!');
	}

	Mailer.call(this, options);
};

util.inherits(MandrillMailer, Mailer);

/**
 * Send a plaintext e-mail message
 *
 * @param {Object} message
 * @return {Promise}
 * @api public
 */
MandrillMailer.prototype.send = function(message) {
	log.debug('sending message:', message);

	var deferred = Promise.defer();

	request
		.post(this.options.baseUrl + '/messages/send.json')
		.send({
			key: this.options.apiKey,
			message: {
				subject: message.subject,
				text: message.text,
				from_email: message.from,
				to: [
					{
						email: message.to
					}
				]
			}
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


module.exports = MandrillMailer;

