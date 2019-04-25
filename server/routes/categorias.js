const express = require('express');

let { verificarToken, verificarAdminRol } = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categorias');

// =====================================
// Mostrar todas las categorias
// =====================================

app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias: categoriaDB
            })

        })


});

// =====================================
// Mostrar solo 1 categoria
// =====================================

app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: 'El Id no es correcto'
            });
        }

        res.json({
            ok: true,
            categorias: categoriaDB
        })

    })

});

// =====================================
// Crear nueva categoria
// =====================================

app.post('/categoria', verificarToken, (req, res) => {
    //add id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
});

// =====================================
// Actualizar nueva categoria
// =====================================

app.put('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descripcionCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descripcionCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })


});

// =====================================
// Actualizar nueva categoria
// =====================================

app.delete('/categoria/:id', [verificarToken, verificarAdminRol], (req, res) => {
    //solo un admin
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: 'El id no existe'
            });
        }

        res.json({
            ok: true,
            categoria: 'Categoria Eliminada'
        })
    })
});


module.exports = app;