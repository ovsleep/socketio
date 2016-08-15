const dotenv = require('dotenv');
dotenv.load();

var Sensor = require('./sensor-mock');
const Socket = require('./socket');
const login = require('./login');

login(process.env.USER, process.env.PASSWORD)
    .then((token) => {
        console.log('Using this token: ' + token);
        socket = new Socket(token);
        socket.connect().then(() => {
            sensor = new Sensor();
            setInterval(() => {
                sensor.read().then((data) => {
                    socket.sendData(data);
                })
            }, process.env.SENSOR_INTERVAL)
        })
    });

//sensor().then(function (data) { console.log(data);})
