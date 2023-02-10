const db = require("../models");
const { User } = db.sequelize.models;
const jwt = require('../manager/jwt');
const bcrypt = require("bcrypt");

const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%&*(){}|~<>;:[\]]{2,}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

// create user in database
async function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;

    try {
        // tests 
        if (!nameRegex.test(firstName)) throw new Error("Invalid name");
        if (!nameRegex.test(lastName)) throw new Error("Invalid name");
        if (!emailRegex.test(email)) throw new Error("Invalid email");
        if (!passwordRegex.test(password)) throw new Error("Invalid password");

        // searching user in database
        const userSearch = await User.findOne({
            attributes: ["email"],
            where: { email: email },
        });
        if (userSearch) throw new Error("Email déja utilisée !");

        // bcrypt hash
        const bcryptedPassword = await bcrypt.hash(password, 5);

        // register user 
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcryptedPassword,
        });
        if (!newUser) throw new Error("la création de l'utilisateur à échouée !");

        return res.status(201).json({
            uuid: newUser.uuid,
        });

    } catch (err) {
        console.error('hello' + err);
        return res.status(400).json(err);
    }
};

// user connection 
async function login(req, res, next) {
    const email = req.body.email;
    const pw = req.body.password;

    try {
        // searching user in database
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("User not found !");

        // bcrypt validation
        const ValidPassword = await bcrypt.compare(pw, user.password);
        if (!ValidPassword) throw new Error("Wrong Password");

        // format response
        const { createdAt, updatedAt, password, ...response } = user.dataValues;

        return res.status(200).json({ user: response, token: jwt.sign(response) });
    } catch (err) {
        console.error(err);
        res.status(401).json(err.message);
    }
};

module.exports = {
    signup, login
}