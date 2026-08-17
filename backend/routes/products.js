const express = require("express");
const router = express.Router();

const db = require("../database");


// Get all products
router.get("/", (req, res) => {

    const sql = `
        SELECT * FROM products
        ORDER BY id DESC
    `;

    db.all(sql, [], (err, products) => {

        if (err) {
            return res.status(500).json({
                message: "Database error."
            });
        }

        res.status(200).json(products);
    });

});

// Add a product
router.post("/", (req, res) => {

    const {
        name,
        category,
        price,
        image,
        description
    } = req.body;

    if (!name || !category || !price) {
        return res.status(400).json({
            message: "Name, category and price are required."
        });
    }

    const sql = `
        INSERT INTO products
        (name, category, price, image, description)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [name, category, price, image, description],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: "Failed to add product."
                });
            }

            res.status(201).json({
                message: "Product added successfully.",
                productId: this.lastID
            });
        }
    );
});

// Get one product
router.get("/:id", (req, res) => {

    const productId = req.params.id;

    const sql = `
        SELECT * FROM products
        WHERE id = ?
    `;

    db.get(sql, [productId], (err, product) => {

        if (err) {
            return res.status(500).json({
                message: "Database error."
            });
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        res.status(200).json(product);
    });

});


module.exports = router;