// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Teacher = require('../models/Teacher');

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// CREATE
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const teacher = new Teacher({
            image: req.file ? req.file.path : null,
            name: req.body.name,
            profession: req.body.profession
        });
        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            profession: req.body.profession
        };
        if (req.file) {
            updatedData.image = req.file.path;
        }
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(teacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
