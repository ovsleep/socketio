var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorHistory = new Schema({
    sensorId: { type: Schema.ObjectId, required: true },
    timestamp: Date,
    status: {
        temperature: number,
        humidity: number,
        light: number,
        waterLevel: number,

        watering: Boolean,

        lastWater: Date,
        lastUpdate: Date
    }
});
    
var SensorHistory = mongoose.model('SensorHistory', userSchema);

module.exports = SensorHistory;