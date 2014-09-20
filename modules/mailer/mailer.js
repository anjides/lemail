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

var validator = require('validate.js');

var MessageValidator = {
	from: {
		email: true
	},
	to: {
		email: true
	},
	subject: {
		presence: true
	},
	text: {
		presence: true
	}
};

var Mailer = function(options) {
	this.options = options || {};
};

/**
 * Send a plaintext e-mail message
 *
 * Message
 * - `subject` 		Message subject
 * - `text`			Message text
 * - `from`			From e-mail
 * - `to`			To e-mail
 *
 * @param {Object} message
 * @return {Promise}
 * @api public
 */
Mailer.prototype.send = function(message) {
	throw new Error('Mailer#send must be overridden!');
};

/**
 * Validate a message
 *
 * @param {Object} message
 * @return {Object} errors
 * @api public
 */
var validate = function(message) {
	return validator(message, MessageValidator);
};

exports.Mailer = Mailer;
exports.validate = validate;
