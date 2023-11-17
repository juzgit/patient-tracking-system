const express = require('express');
const router = express.Router();
const Speciality = require('../models/SpecialityModel');

// Route to create a new speciality
router.post('/specialities', async (req, res) => {
    try {
        const { name, description } = req.body;
        const speciality = new Speciality({ name, description });
        await speciality.save();
        res.status(201).json(speciality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all specialities
router.get('/specialities', async (req, res) => {
    try {
        const specialities = await Speciality.find();
        res.json(specialities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a specific speciality by ID
router.get('/specialities/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const speciality = await Speciality.findById(id);
        if (!speciality) {
            return res.status(404).json({ error: 'Speciality not found' });
        }
        res.json(speciality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a speciality by ID
router.put('/specialities/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const speciality = await Speciality.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!speciality) {
            return res.status(404).json({ error: 'Speciality not found' });
        }
        res.json(speciality);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a speciality by ID
router.delete('/specialities/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSpeciality = await Speciality.findByIdAndDelete(id);
        if (!deletedSpeciality) {
            return res.status(404).json({ error: 'Speciality not found' });
        }
        res.json({ message: 'Speciality deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
