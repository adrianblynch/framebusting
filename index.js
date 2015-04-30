var Hapi = require('hapi');

var port = process.argv[2] || 3000;

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: port,
    routes: {
    	files: {
            relativeTo: __dirname
        }
    }
});

// Good

server.route({
    method: 'GET',
    path:'/cp.html',
    handler: function (request, reply) {

		var page = [
			'<html>',
			'<head>',
			'	<title>Good Site (aka Concrete)</title>',
			'</head>',
			'<body>',
			'	<h1>Good Site (aka Concrete)</h1>',
			'	<p>This is the page everyone wants to load!</p>',
			'</body>',
			'</html>'
        ];

        return reply(page.join("\n"))
        	.type("text/html")
        	.header('X-Frame-Options', 'sameorigin');

    }
});

server.route({
    method: 'GET',
    path:'/good-frame.html',
    handler: function (request, reply) {

		 var page = [
			'<html>',
			'<head>',
			'	<title>Good Frame</title>',
			'</head>',
			'<body>',
			'	<h1>Good Frame</h1>',
			'	<p>Below is an iframe which loads another page on the site. This is a good thing.</p>',
			'	<iframe src="http://localhost:3001/cp.html" height="500" width="500"></iframe>',
			'</body>',
			'</html>'
        ];

        return reply(page.join("\n"))
        	.type("text/html")
        	.header('X-Frame-Options', 'sameorigin');

    }
});

// Bad

server.route({
	method: 'GET',
	path:'/bad-frame.html',
	handler: function (request, reply) {

		var page = [
			'<html>',
			'<head>',
			'	<title>Bad Frame</title>',
			'</head>',
			'<body>',
			'	<h1>Bad Frame</h1>',
			'	<p>Below is an iframe which attempts to load a page from another site. This is a bad thing and should be stopped!</p>',
			'	<iframe src="http://localhost:3001/cp.html" height="500" width="500"></iframe>',
			'</body>',
			'</html>'
		];

		return reply(page.join("\n")).type("text/html");

	}
});

server.start();
