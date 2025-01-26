const db = require('../models');
const Profile = db.Profile;

exports.createProfile = async (req, res) => {
    try {
        const profile = await Profile.create(req.body);
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profile = await Profile.findAll();
        res.status(200).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (user) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (profile) {
            await profile.update(req.body);
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (profile) {
            await profile.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
