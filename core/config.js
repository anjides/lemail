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

var _ = require('lodash');

var config = {
	
	development: {
		appName: 			process.env.APP_NAME || 'lemail-api-dev',
		port: 				process.env.PORT || 8000,
		logLevel: 			process.env.LOG_LEVEL || 'debug',
		mandrillApiKey: 	process.env.MANDRILL_API_KEY,
		mailgunApiKey:		process.env.MAILGUN_API_KEY,
		mailgunDomain:		process.env.MAILGUN_DOMAIN
	},

	production: {
		appName: 			process.env.APP_NAME || 'lemail-api',
		port: 				process.env.PORT || 8000,
		logLevel: 			process.env.LOG_LEVEL || 'error',
		mandrillApiKey: 	process.env.MANDRILL_API_KEY,
		mailgunApiKey:		process.env.MAILGUN_API_KEY,
		mailgunDomain:		process.env.MAILGUN_DOMAIN
	}

};

var env = process.env.NODE_ENV;

if (!env) {
	console.warn('NODE_ENV environment variable not set, defaulting to development');
	env = 'development';
}

module.exports = _.extend({}, config[env], { env: env });
