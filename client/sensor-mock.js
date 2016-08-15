var childProccess = require("child_process")
var Promise = require('bluebird');

var Sensor = function () {

    this.read = function () {
        return new Promise(function (resolve, reject) {
            //execute python code
            setTimeout(() => {
                dataParsed = {
                    temp: Math.floor((Math.random() * 10) + 17),
                    hum: Math.floor((Math.random() * 100) + 1)
                }

                resolve(dataParsed);
            }, 2000);
        });
    }
}

module.exports = Sensor;