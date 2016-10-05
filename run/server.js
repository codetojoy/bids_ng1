var connect = require('connect');
serveStatic = require('serve-static');

var app = connect();
 
app.use(serveStatic("./bids_ng1"));
app.listen(5000);
