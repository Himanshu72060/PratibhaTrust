const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
    image: String,
    name: String,
    profession: String
});
module.exports = mongoose.model('Teacher', TeacherSchema);
