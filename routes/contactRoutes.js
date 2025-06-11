const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const event = new Event({ title: req.body.title, image: req.file.path });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

router.put('/:id', upload.single('image'), async (req, res) => {
    const updated = await Event.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        ...(req.file && { image: req.file.path })
    }, { new: true });
    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;
