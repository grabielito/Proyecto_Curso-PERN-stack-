const e = require("express");
const pool = require("../postgre");

///Gets
const getEstanted = async (req, res, next) => {
    try {
        const estante = await pool.query("SELECT estareapaq.idestante,estareapaq.idarea,estareapaq.codpaq,paquete.tamaño,compra.fecha,compra.ci,cliente.nombre,cliente.direccion FROM estareapaq JOIN paquete ON paquete.codpaq=estareapaq.codpaq JOIN compra ON paquete.codpaq=compra.codpaq JOIN cliente ON compra.ci=cliente.ci WHERE estareapaq.idestante='d' AND estareapaq.idarea='d1'  OR estareapaq.idarea='d2' OR  estareapaq.idarea='d3' ORDER BY estareapaq.idarea,compra.fecha DESC")
        res.json(estante.rows)
    }

    catch (error) {
        next(error)
    }
};


const getEstante1 = async (req, res, next) => {
    try {
        const estante = await pool.query("SELECT estareapaq.idestante,estareapaq.idarea,estareapaq.codpaq,paquete.tamaño,compra.fecha,compra.ci,cliente.nombre,cliente.direccion FROM estareapaq JOIN paquete ON paquete.codpaq=estareapaq.codpaq JOIN compra ON paquete.codpaq=compra.codpaq JOIN cliente ON compra.ci=cliente.ci WHERE estareapaq.idestante='1' AND estareapaq.idarea='11'  OR estareapaq.idarea='12' ORDER BY estareapaq.idarea")
        res.json(estante.rows)
    }

    catch (error) {
        next(error)
    }
};

const getEstante2 = async (req, res, next) => {
    try {
        const estante = await pool.query("SELECT estareapaq.idestante,estareapaq.idarea,estareapaq.codpaq,paquete.tamaño,compra.fecha,compra.ci,cliente.nombre,cliente.direccion FROM estareapaq JOIN paquete ON paquete.codpaq=estareapaq.codpaq JOIN compra ON paquete.codpaq=compra.codpaq JOIN cliente ON compra.ci=cliente.ci WHERE estareapaq.idestante='2' AND estareapaq.idarea='21'  OR estareapaq.idarea='22' ORDER BY estareapaq.idarea")
        res.json(estante.rows)
    }

    catch (error) {
        next(error)
    }
};

const getEstante3 = async (req, res, next) => {
    try {
        const estante = await pool.query("SELECT estareapaq.idestante,estareapaq.idarea,estareapaq.codpaq,paquete.tamaño,compra.fecha,compra.ci,cliente.nombre,cliente.direccion FROM estareapaq JOIN paquete ON paquete.codpaq=estareapaq.codpaq JOIN compra ON paquete.codpaq=compra.codpaq JOIN cliente ON compra.ci=cliente.ci WHERE estareapaq.idestante='3' AND estareapaq.idarea='32'  OR estareapaq.idarea='31' ORDER BY estareapaq.idarea")
        res.json(estante.rows)
    }

    catch (error) {
        next(error)
    }
};

const getAllEstantes = async (req, res, next) => {
    try {
        const estante = await pool.query("SELECT idestante,idarea,codpaq FROM estareapaq ")
        res.json(estante.rows)
    }

    catch (error) {
        next(error)
    }
};


const getPaquete = async (req, res, next) => {
    const { id } = req.params;
    try {
        const paquete = await pool.query("SELECT idestante,idarea FROM estareapaq WHERE codpaq=$1 ", [id]);
        return res.json(paquete.rows[0])

    }

    catch (error) {
        next(error)
    }
};

const getCantPaq = async (req, res, next) => {

    try {
        const paquete = await pool.query("SELECT estareapaq.idestante ,  COUNT (*) as CantPaquetes, estante.totalpaq FROM estareapaq  JOIN estante ON estareapaq.idestante=estante.idestante GROUP BY estareapaq.idestante, estante.totalpaq ORDER BY CantPaquetes ");

        res.json(paquete.rows)

    }

    catch (error) {
        next(error)
    }
};

const getInfoAreas = async (req, res, next) => {

    try {
        const areas = await pool.query("SELECT estareapaq.idarea,COUNT(*) as cantidaddepaq, areas.cantpaq, areas.rangptam, estante.idestante FROM estareapaq JOIN areas ON estareapaq.idarea=areas.idarea JOIN estante ON estante.idestante=areas.idestante GROUP BY estareapaq.idarea,areas.cantpaq,areas.rangptam,estante.idestante ORDER BY cantidaddepaq ");

        res.json(areas.rows)

    }

    catch (error) {
        next(error)
    }
};

const getCantPaqPorTam = async (req, res, next) => {
    const { tamano } = req.params;
    try {
        const paquetes = await pool.query("SELECT estareapaq.codpaq,paquete.tamaño FROM estareapaq JOIN paquete ON estareapaq.codpaq=paquete.codpaq WHERE paquete.tamaño=$1 ", [tamano])
        if (paquetes.rows.length === 0) return res.status(404).json({ message: "Paquete not found", });
        res.json(paquetes.rowCount)
    }
    catch (error) {
        next(error)
    }

};

const getCompras = async (req, res, next) => {

    try {
        const compra = await pool.query("SELECT compra.idcompra,compra.fecha,producto.nombreprod,compra.cantprod,cliente.nombre,cliente.ci,compra.codpaq FROM compra JOIN producto ON compra.idproducto=producto.idprod JOIN cliente ON compra.ci=cliente.ci ORDER BY compra.fecha ");

        res.json(compra.rows)

    }

    catch (error) {
        next(error)
    }
};

let idap = 322;
const createCompra = async (req, res, next) => {
    idap += 1;
    const { codpaq, tamano, idarea, idcompra, cantprod, fecha, ci, idprod, idestante } = req.body;

    try {
        const paq = await pool.query("INSERT INTO paquete (codpaq,tamaño,idarea) VALUES ($1,$2,$3)", [codpaq, tamano, idarea]);
        const compra = await pool.query("INSERT INTO compra (idcompra,fecha,cantprod,ci,codpaq,idproducto) VALUES ($1,$2,$3,$4,$5,$6)", [idcompra, fecha, cantprod, ci, codpaq, idprod]);
        const estante = await pool.query("INSERT INTO estareapaq (idestante,idarea,codpaq,ideap) VALUES($1,$2,$3,$4)", [idestante, idarea, codpaq, idap]);

        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }

};

const eliminarCompra= async(req,res,next)=>{
    const {idpaq}=req.params;
    try {
      const result= await pool.query("DELETE FROM paquete WHERE codpaq=$1",[idpaq]);
      return res.sendStatus(204);


    } catch (error) {
        next(error)
    }


};

const sendToDonaciones = async (req, res, next) => {
    const { codpaq } = req.params;
    const {idarea} = req.body;
    try {
        const result = await pool.query("UPDATE estareapaq SET idestante='d',idarea=$1 WHERE codpaq=$2 RETURNING *", [idarea,codpaq]);
        const paq= await pool.query("UPDATE paquete SET idarea=$1 WHERE codpaq=$2 RETURNING *", [idarea,codpaq]);
        if (result.rows.length === 0 || paq.rows.length===0)
            return res.status(404).json({
                message: "Package not found",
            });
        return res.json(result.rows[0]&&paq.rows[0])  
    }
    catch (error) {
        next(error)
    }

};



module.exports = {
    getEstante1,
    getEstante2,
    getEstante3,
    getPaquete,
    getEstanted,
    getCantPaq,
    getCantPaqPorTam,
    createCompra,
    eliminarCompra,
    getCompras,
    getInfoAreas,
    getAllEstantes,
    sendToDonaciones
}
