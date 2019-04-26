const express = require('express');

const { verificarToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/products');

//=====================================
// Obtener todos los productos
//=====================================

app.get('/productos', verificarToken, (req, res) => {
    //populate usuario categoria
    //trae todos
    //paginado
    let desde = req.query.desde || 0;

    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos: productoDB
            });

        });


});

app.put('/productos/:id', verificarToken, (req, res) => {
    //populate usuario cattegoria
    //paginado

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: 'El id no existe'
            })
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })


        })

    })

});

app.post('/productos', verificarToken, (req, res) => {
    //grabar id
    //grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

})

app.get('/productos/:id', verificarToken, (req, res) => {
    //grabar id
    //grabar una categoria del listado
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'El id no exite'
                })
            }

            res.json({
                ok: true,
                productos: productoDB
            })

        });

})

app.delete('/productos/:id', (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: 'El id no exite'
            })
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'producto borrado'
            })
        })

    })

})

module.exports = app;