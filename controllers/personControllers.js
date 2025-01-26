const db = require('../models');
const Person = db.Person;

exports.createPerson = async (req, res) => {
    try {
        const person = await Person.create(req.body);
        res.status(201).json(person);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllPersons = async (req, res) => {
    try {
        const person = await Person.findAll();
        res.status(200).json(person);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPersonById = async (req, res) => {
    try {
        const person = await Person.findByPk(req.params.id);
        if (person) {
            res.status(200).json(person);
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePerson = async (req, res) => {
    try {
        const person = await Person.findByPk(req.params.id);
        if (person) {
            await person.update(req.body);
            res.status(200).json(person);
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePerson = async (req, res) => {
    try {
        const person = await Person.findByPk(req.params.id);
        if (person) {
            await person.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
