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

var API_VERSION = 'v1';

var express = require('express')
	, bodyParser = require('body-parser')
	, log = require('./core/log').child({ module: 'core' })
	, api = require('./core/api')
	, errorHandler = require('./core/error-handler')
	, config = require('./core/config');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/' + API_VERSION + '/', api());

// error handler should go last
app.use(errorHandler);

app.listen(config.port);
log.info('listening on port %s', config.port);
