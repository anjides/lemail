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

var Mailer = function(options) {
	this.options = options || {};
};

/**
 * Send a plaintext e-mail message
 *
 * Message
 * - `subject` 		Message subject
 * - `text`			Message text
 * - `fromEmail`	From e-mail
 * - `toEmail`		To e-mail
 *
 * @param param type
 * @return return type (Promise, String, etc)
 * @promiseSuccess promise success return
 * @api promise success return
 */
Mailer.prototype.send = function(msg) {
	throw new Error('Mailer#send must be overridden!');
};

module.exports = Mailer;
