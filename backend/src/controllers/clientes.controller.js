const e = require("express");
const pool = require("../postgre");

///Gets
const getClientes = async (req, res, next) => {
    try {
        const allcostumers = await pool.query("SELECT cliente.ci,cliente.nombre,cliente.numtarj,cliente.direccion FROM cliente ")
        res.json(allcostumers.rows)
    }

    catch (error) {
        next(error)
    }
};

const getClienteByCI = async (req, res, next) => {
    const { ci } = req.params;
    try {
        const cliente = await pool.query("SELECT * FROM cliente WHERE ci=$1", [ci])
        if (cliente.rows.length === 0) return res.status(404).json({ message: "Client not found", });
        res.json(cliente.rows)
    }
    catch (error) {
        next(error)
    }

};
const getClienteByName = async (req, res, next) => {
    const { nombre } = req.params;

    try {
        const cliente = await pool.query("SELECT * FROM cliente WHERE nombre=$1", [nombre])
        if (cliente.rows.length === 0) return res.status(404).json({ message: "Client not found", });

        res.json(cliente.rows)

    }
    catch (error) {
        next(error)
    }

};


////Create

const createCliente = async (req, res) => {
    const { ci, nombre, numtarj, direccion } = req.body;
    try {
        const result = await pool.query("INSERT INTO cliente (ci, nombre, numtarj, direccion) VALUES($1,$2,$3,$4)", [ci, nombre, numtarj, direccion]);
        console.log(result);
        res.send('creando un cliente');
    }
    catch (error) {
        next(error)
    }
};

////Delete
const deleteCliente = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM cliente WHERE ci=$1", [id])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "client not found",
            });

        return res.sendStatus(204);
    }
    catch (error) {
        next(error)
    }
};

////Update

const updateCliente = async (req, res, next) => {
    const { id } = req.params;
    const { ci, nombre, numtarj, direccion } = req.body;
    try {
        const result = await pool.query("UPDATE cliente SET ci=$1,nombre=$2,numtarj=$3,direccion=$4 WHERE ci=$5 RETURNING *", [ci, nombre, numtarj, direccion, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "client not found",
            });
        return res.json(result.rows[0])
    }
    catch (error) {
        next(error)
    }

};

module.exports = {
    createCliente,
    getClienteByCI,
    getClienteByName,
    getClientes,
    deleteCliente,
    updateCliente
    
}