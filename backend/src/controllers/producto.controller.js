const e = require("express");
const pool = require("../postgre");


const getProductos = async (req, res, next) => {
    try {
        const productos = await pool.query("SELECT * FROM producto");
        res.json(productos.rows)
    } catch (error) {
        next(error)
    }

};

const getProducto = async (req, res, next) => {
    const { id } = req.params;
    try {
        const producto = await pool.query("SELECT * FROM producto WHERE idprod=$1", [id])
        if (producto.rows.length === 0) return res.status(404).json({ message: "Product not found", });
        res.json(producto.rows)
    }
    catch (error) {
        next(error)
    }

};

const createProducto = async (req, res, next) => {
    const { idprod, nombreprod, precio } = req.body;
    try {
        const result = await pool.query("INSERT INTO producto (idprod,nombreprod,precio) VALUES ($1,$2,$3)", [idprod, nombreprod, precio]);
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
};

const deleteProducto = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM producto WHERE idprod=$1", [id])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "product not found",
            });

        return res.sendStatus(204);
    }
    catch (error) {
        next(error)
    }
};

const updateProducto = async (req, res, next) => {
    const { id } = req.params;
    const { idprod, nombreprod, precio } = req.body;
    try {
        const result = await pool.query("UPDATE producto SET idprod=$1,nombreprod=$2,precio=$3 WHERE idprod=$4 RETURNING * ", [idprod, nombreprod, precio, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "product not found",
            });
        return res.json(result.rows[0])
    }
    catch (error) {
        next(error)
    }

};

module.exports = {
    getProductos,
    createProducto,
    deleteProducto,
    updateProducto,
    getProducto
}
