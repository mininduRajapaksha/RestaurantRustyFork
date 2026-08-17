const express = require("express");
const router = express.Router();

const db = require("../database");


// Register user
router.post("/register", (req, res) => {

    const { fullName, email, phone, password } = req.body;

    // Check required fields
    if (!fullName || !email || !phone || !password) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }


    // Check if email already exists
    const checkEmail = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.get(checkEmail, [email], (err, user) => {

        if (err) {
            return res.status(500).json({
                message: "Database error."
            });
        }

        if (user) {
            return res.status(409).json({
                message: "Email already registered."
            });
        }


        // Insert new user
        const sql = `
            INSERT INTO users
            (fullName, email, phone, password)
            VALUES (?, ?, ?, ?)
        `;

        db.run(
            sql,
            [fullName, email, phone, password],
            function (err) {

                if (err) {
                    return res.status(500).json({
                        message: "Failed to register user."
                    });
                }

                res.status(201).json({
                    message: "User registered successfully.",
                    userId: this.lastID
                });

            }
        );

    });

});

// Login user
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password."
        });
    }

    // Find user
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.get(sql, [email], (err, user) => {

        if (err) {
            return res.status(500).json({
                message: "Database error."
            });
        }

        // User not found
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Check password
        if (password !== user.password) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });

    });

});


module.exports = router;