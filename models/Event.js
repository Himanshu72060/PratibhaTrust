const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    image: String,
    title: String
});
module.exports = mongoose.model('Event', EventSchema);
