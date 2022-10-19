var http = require('http');

http.createServer(function (req, res) {
	
	var url = req.url;

	if(url ==='/page1' || url === '/' || url === '') {
		res.write('This is page one');
		res.end();
	}
	else if(url ==='/page2') {
		res.write('This is page two');
		res.end();
	}
    else if(url ==='/page3') {
		res.write('This is page three');
		res.end();
	}
	else{
		res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/page1' });
		res.end();
	}
}).listen(8000, function() {	
	console.log("server start at port 8000");
});