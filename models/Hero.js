const mongoose = require('mongoose');
const HeroSchema = new mongoose.Schema({
    image: String,
    heading: String,
    subheading: String
});
module.exports = mongoose.model('Hero', HeroSchema);
