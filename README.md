## Le Mail
An e-mail client.

#### Project chosen
E-mail

#### Track chosen
Backend (originally was going to do full stack, but didn't due to time constraints).

#### My background
My experience is a mix of:

- node.js (backend)
- backbone, angular (frontend)
- iOS

#### Technical choices
I chose to do the API as a pure REST service because I find that this pays dividends down the line when you have more than one client using it (i.e. a mobile app). I think most of the choices with regard to NPM modules used are pretty self-explanatory, ping me if you want clarification on any of the choices.

#### Future improvements

- add authentication
- make the e-mail requests get put into a queue and have e-mail workers get them from the queue to make them send

#### Other code
Most of the code I've written is proprietary, so I can't disclose it.

#### Components

##### API backend

Tech used:

- node.js
- express (routing, parsing request body)
- bunyan (logging)
- superagent (sending HTTP requests)
- lodash (general utilities)
- bluebird (promises)
- validate.js (route validation)
- mocha (tests)

API docs are provided in the include `API.md` file.

##### Web client

I ran out of time here (iOS 8 release, so all my time, incl. weekends was taken up working on that), so I just did a barebones frontend with Bootstrap and jQuery.

Tech used:

- jQuery
- Bootstrap
- HTML5 boilerplate
