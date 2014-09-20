### Email service API docs

The e-mail service API is a versioned REST API. There's currently no authentication scheme. Email away!

#### V1 documentation

Base route:

`https://lemail.herokuapp.com/v1/`

All routes are relative to the base URL. The API currently only accepts JSON objects.

##### Routes:

`POST /messages`:

Send an email thru the API. Uses multiple services to attempt to send the email (currently Mailgun and Mandrill).

Responses: `201` on success, `400` on invalid input, `500` on server failure.

Example request JSON:

	{
		"from": "foo@bar.com",
		"to": "foo@anotherbar.com",
		"subject": "Email subject",
		"text": "Email text"
	}
	
Example success JSON:

	{	
	}
	
Example error JSON:

	{
		"message": {
			"subject": [
				"Subject can't be blank"
			]
		}
	}