const db = require('../models');
const Category = db.Category;

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.findAll();
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (user) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
