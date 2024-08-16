const express = require('express');
const bcrypt = require('bcrypt');
const Worker = require('../models/WorkerModel');

const addWorker = async (req, res) => {
    const { firstName, lastName, email, profilePic, mobileNumber, bio } = req.body;

    try {
        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) {
            return res.status(400).json({ message: 'Worker already exists with this email' });
        }

        const worker = new Worker({
            firstName,
            lastName,
            email,
            profilePic,
            mobileNumber,
            bio
        });

        await worker.save();
        res.status(201).json({ message: 'Worker added successfully', worker });
    } catch (error) {
        res.status(500).json({ message: 'Error adding worker', error });
    }
};


// Update an existing worker
const updateWorker = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, profilePic, mobileNumber, bio } = req.body;

    try {
        const worker = await Worker.findById(id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        worker.firstName = firstName || worker.firstName;
        worker.lastName = lastName || worker.lastName;
        worker.profilePic = profilePic || worker.profilePic;
        worker.mobileNumber = mobileNumber || worker.mobileNumber;
        worker.bio = bio || worker.bio;

        await worker.save();
        res.status(200).json({ message: 'Worker updated successfully', worker });
    } catch (error) {
        res.status(500).json({ message: 'Error updating worker', error });
    }
};

// Delete a worker
const deleteWorker = async (req, res) => {
    const { id } = req.params;

    try {
        const worker = await Worker.findByIdAndDelete(id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        res.status(200).json({ message: 'Worker deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting worker', error });
    }
};
/*





const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

// Route to add a new worker
router.post('/workers', workerController.addWorker);

// Route to update an existing worker
router.put('/workers/:id', workerController.updateWorker);

// Route to delete a worker
router.delete('/workers/:id', workerController.deleteWorker);

module.exports = router;




*/  

// Get all workers
const getAllWorkers = async (req, res) => {
    try {
        const workers = await Worker.find();
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workers', error });
    }
};

// Get worker by ID
const getWorkerById = async (req, res) => {
    const { id } = req.params;
    try {
        const worker = await Worker.findById(id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving worker', error });
    }
};

// Get worker by name
const getWorkerByName = async (req, res) => {
    const { name } = req.params;
    try {
        const workers = await Worker.find({
            $or: [
                { firstName: new RegExp(name, 'i') },
                { lastName: new RegExp(name, 'i') }
            ]
        });
        if (workers.length === 0) {
            return res.status(404).json({ message: 'No workers found with that name' });
        }
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workers by name', error });
    }
};

module.exports = {
    getAllWorkers,
    getWorkerById,
    getWorkerByName,
    addWorker,
    updateWorker,
    deleteWorker
};