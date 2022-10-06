const { Router } = require('express');
const pool = require('../postgre');
const { getClienteByCI, getClientes, getClienteByName, createCliente, deleteCliente, updateCliente } = require('../controllers/clientes.controller');
const { getEstante1, getPaquete, getEstanted, getCantPaq, getCantPaqPorTam, getEstante2, getEstante3, createCompra, eliminarCompra, getCompras, getInfoAreas, getAllEstantes, sendToDonaciones } = require('../controllers/estantes.controller');
const { getProductos, createProducto, deleteProducto, updateProducto, getProducto } = require('../controllers/producto.controller');

const router = Router();


/////Clientes/////////
////Gets
router.get('/clientes', getClientes)

router.get('/clientes/:ci', getClienteByCI)

router.get('/clientes/consulta/:nombre',getClienteByName)

////Create
router.post('/clientes',createCliente)

////Delete
router.delete('/clientes/:id',deleteCliente)

////Update
router.put('/clientes/:id',updateCliente)

/////Estantes///////////////////////////////////////////////////////////////////////////
router.get('/estantes/estanted',getEstanted)

router.get('/estantes/estante1',getEstante1)

router.get('/estantes/estante2',getEstante2)

router.get('/estantes/estante3',getEstante3)

router.get('/estantes/allestantes',getAllEstantes)

router.get('/estantes/:id',getPaquete)

router.get('/estantes/paquetes/:tamano',getCantPaqPorTam)

router.put('/estantes/:codpaq',sendToDonaciones)

router.get('/paquetes/paquetes_cant',getCantPaq)
//////////Creates/////////////////
router.post('/compra',createCompra)

router.get('/compra',getCompras)

router.get('/areas',getInfoAreas)

////Delete
router.delete('/compra/:idpaq',eliminarCompra)


///////////Productos//////////////////////
router.get('/productos',getProductos)

router.get('/producto/:id',getProducto)

router.post('/productos',createProducto)

router.delete('/productos/:id',deleteProducto)

router.put('/productos/:id',updateProducto)


module.exports = router;