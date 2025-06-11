const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET
router.get('/', async (req, res) => {
    const data = await Contact.find();
    res.json(data);
});

// PUT
router.put('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
});

// DELETE
router.delete('/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;
