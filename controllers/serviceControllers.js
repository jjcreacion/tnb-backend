const db = require('../models');
const Service = db.Service;
const Category = db.Category;

exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllService = async (req, res) => {
    try {
        const service = await Service.findAll();
        res.status(200).json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllServiceAllData = async (req, res) => {
    try {
        const service = await Service.findAll({
            include: [
                {
                    model: Category, 
                    as: 'category', 
                    required: false, 
                },
            ],
        });
        res.status(200).json(service);
    } catch (err) {
        console.error("Error al obtener servicios:", err); 
        res.status(500).json({ error: err.message }); 
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (user) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (category) {
            await service.update(req.body);
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (service) {
            await service.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
