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
	, Promise = require('bluebird')
	, _ = require('lodash')
	, Mailer = require('../mailer').Mailer
	, log = require('../../core/log').child({ module: 'multi-mailer '});

/**
 * `MultiMailer` constructor
 * 
 * The multi-mailer takes an array of other mailers and tries to send a mail using a random permutation of them until one works
 *
 * Options
 * - `mailers`		An array of Mailer objects (required)
 * 
 * @param {Object} options
 * @api public
 */
var MultiMailer = function(options) {
	options = _.extend({}, {}, options);

	if (!options.mailers || !options.mailers.length) {
		throw new Error('Missing required mailers parameter');
	}

	Mailer.call(this, options);
};

util.inherits(MultiMailer, Mailer);

/**
 * Send a plaintext e-mail message
 *
 * @param {Object} message
 * @return {Promise}
 * @api public
 */
MultiMailer.prototype.send = function(message) {
	var shuffledMailers = _.shuffle(this.options.mailers);

	return function tryMailer(index, message) {
		var mailer = shuffledMailers[index];

		log.debug('trying mailer at index %s', index);

		if (!mailer) {
			return Promise.reject('Couldn\'t send mail, all mail servers failed');
		}

		return mailer.send(message).catch(function(err) {
			log.warn('mailer failed to send message:', err);
			return tryMailer(++index, message);			
		});
	}(0, message);
};

module.exports = MultiMailer;

