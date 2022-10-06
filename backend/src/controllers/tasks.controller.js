const e = require("express");
const pool = require("../postgre");



// Getsss

///////////////Creates
const createProducto = async (req, res) => {
    const { idestante, totalpaq } = req.body;
    const result = await pool.query("INSERT INTO estante (idestante,totalpaq) VALUES($1,$2)", [idestante, totalpaq]);
    console.log(result);
    res.send('creando un producto');

};




////////////////Deletes
const deleteProducto = (req, res) => {
    res.send('eliminando un producto');

};

///////////////Updates
const updateProducto = (req, res) => {
    res.send('actualizando un producto');

};


//////////////Exportaciones
module.exports = {
    updateProducto,
    deleteProducto,
    
}