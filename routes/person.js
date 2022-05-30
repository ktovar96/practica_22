const express = require('express'); //inyeccion de dependencia express
const router = express.Router();
const mongoose = require('mongoose'); //inyeccion de dependencia mongoose
const person = require('../models/person'); 

let Person = require('../models/person'); //requiere el archivo person que se encuentra dentro de la carpeta models

router.get('/persons', function(req, res, next) { //creamos la ruta que renderiza persons, nos muetra una lista de las personas de la BD
    Person.find(function (err, persons){
        if (err) return next(err);
        res.render("persons", {'persons': persons});
    })
});

router.get('/person', function (req, res) {
    res.render('./person');
});

router.get('/deletePerson/:id', function(req, res, next) { //Creamos la ruta para eliminar a una persona por su id
    Person.findByIdAndRemove(req.params.id, req.body, function (err, post){
        if(err) return next(err);
        res.redirect('/persons');
    });
});

router.get('/findById/:id', function(req, res, next){ // creamos la ruta para encontrar una persona por su id
    Person.findById(req.params.id, function (err, person){
        if(err) return next(err);
        res.render('personUpdate', {person});
    })
})

router.post('/addPerson', function(req, res) { // Esta ruta es para agregar personas a la BD
    const person = new Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    });
    person.save()
    res.redirect("./persons") 
});


router.get('/index', function (req, res){ //Es la ruta que renderiza index
    res.render('./index');
});

router.post('/updatePerson', function(req, res, next){ //Ruta para actualizar los datos de una persona
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss }, function (err, post) {
            if(err) return next(err);
            res.redirect('/persons');
        })
})

module.exports = router;