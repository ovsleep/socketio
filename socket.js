const socketio = require('socket.io');
const socketioJwt = require('socketio-jwt');



var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
};

module.exports.listen = function (app) {
    var io = socketio.listen(app);

    io.on('connection', socketioJwt.authorize({
        secret: process.env.AUTH0_CLIENT_SECRET,
        timeout: 15000 // 15 seconds to send the authentication message
    }))
	.on('authenticated', function (socket) {
	    console.log('connected & authenticated: ' + JSON.stringify(socket.decoded_token));
	    socket.emit('action', 'jump around!');
	    socket.on('sensor', function (msg) {
	        
	    });
	})
    
    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

    return io;
}
