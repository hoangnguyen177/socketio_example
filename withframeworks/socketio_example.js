
var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , socket = require('socket.io').listen(server);
server.listen(3000);


require('jade');
app.set('view engine', 'jade');
app.set('view options', {layout: false});

//js+css files
app.get('/*.(js|css)', function(req, res){
  res.sendfile("./public"+req.url);
});

app.get('/', function(req, res){
	res.render('index');	
});

var activeClients = 0;

function clientDisconnect(client){
  activeClients -=1;
  client.broadcast.send({clients:activeClients})
}

function sendNewItems(){
  if(next = buffer.pop()){ 
    socket.broadcast.send(next); 
  }
}

socket.sockets.on('connection', function(client){ 
  activeClients +=1;
  socket.broadcast.send({clients:activeClients})
  client.send({apps:clientSideAppList})
  client.on('disconnect', function(){clientDisconnect(client)});
}); 




//update messages on a timer - this method is preferrable to setInterval for our purposes
setTimeout(function(){
  sendNewItems();
  setTimeout(arguments.callee, 1000);
}, 1000);
