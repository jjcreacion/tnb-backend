const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const User = db.User;
const Person = db.Person;
const Profile = db.Profile;

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            where: { email: email }
        });

        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyPhone = async (req, res) => {
    try {
        const { phone } = req.body;

        const user = await User.findOne({
            where: { phone: phone }
        });

        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllUsersAllData = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Person, 
                    as: 'person', 
                    required: false, 
                },
                {
                    model: Profile, 
                    as: 'profile', 
                    required: false, 
                },
            ],
        });
        res.status(200).json(users);
    } catch (err) {
        console.error("Error al obtener usuarios:", err); 
        res.status(500).json({ error: err.message }); 
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.verifyUserEmail = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
  
      const user = await User.findOne({
        where: { 
            email: email,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password); 
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); 
  
      res.status(200).json({ token });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };

exports.verifyUserPhone = async (req, res) => {
    try {
      const { phone, password } = req.body;
  
      if (!phone || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
  
      const user = await User.findOne({
        where: { 
            phone: phone,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password); 
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); 
  
      res.status(200).json({ token });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
