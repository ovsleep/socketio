var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorSchema = new Schema({
    userId: { type: Schema.ObjectId, required: true },
    name: String,
    status: {
        temperature: number,
        humidity: number,
        light: number,
        waterLevel: number,

        watering: Boolean,

        lastWater: Date,
        lastUpdate: Date
    },
});

var Sensor = mongoose.model('Sensor', userSchema);

module.exports = Sensor;