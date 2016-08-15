var childProccess = require("child_process")
var Promise = require('bluebird');

var Sensor = function () {
    var _command = "sudo python " + process.env.ADAFRUIT_PATH + " 11 " + process.env.SENSOR_PIN;

    this.read = function () {
        return new Promise(function (resolve, reject) {
            //execute python code
            var process = childProccess.exec(_command);

            process.stdout.on('data', (data) => {
                //parse data
                var parsed = data.match(/Temp=\s*([0-9.]+)\*\s*Humidity=\s*([0-9.]+)/);
                if (parsed) {
                    dataParsed = {
                        temp: parsed[1],
                        hum: parseFloat(parsed[2])
                    }

                    resolve(dataParsed);
                }
                else {
                    reject('error reading data');
                }
            });

            process.stderr.on('data', (data) => {
                reject(`stderr: ${data}`);
            });
        });
    }
}

module.exports = Sensor;