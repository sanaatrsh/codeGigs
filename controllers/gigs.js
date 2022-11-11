const Gig = require('../models/gig')
const express = require('express');
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getGigs = (req, res, next) => {
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs: gigs,
                path: '/gigs'
            })
            console.log(gigs)
            // res.sendStatus(200)
        })
        .catch((err => console.log(err)))
}

exports.getAddGigs = (req, res, next) => {
    res.render('add', {
        path: '/gigs/add',
        // errors: errors
    })
}

exports.postAddGigs = (req, res, next) => {
    let { title, technologies, description, budget, contact_email } = req.body;
    //Validate Fields
    let errors = [];
    if (!title) {
        errors.push({ text: 'Please add a title' })
    }
    if (!description) {
        errors.push({ text: 'Please add a description' })
    }
    if (!technologies) {
        errors.push({ text: 'Please add a technologies' })
    }
    if (!contact_email) {
        errors.push({ text: 'Please add an email' })
    }
    if (errors.length > 0) {
        res.render('add', {
            path: '/gigs/add'
        },
        );
        // console.log(errors)
    }
    else {
        if (!budget) {
            budget = 'Unknown';
        }
        else {
            budget = `$${budget}`
        }
        technologies = technologies.toLowerCase().replace(/ , /g, ',')
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
}

exports.getSearchGigs = (req, res, next) => {
    let { term } = req.query;

    term = term.toLowerCase()

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => {
            res.render('gigs', { gigs, path: '/gigs' })
        })
        .catch(err => console.log(err))

}