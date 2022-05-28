const express = require('express');
const connection = require('../database');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers') 

//Add a new link
router.get('/add', isAuthenticated, (req, res) => {
    res.render('links/add');
})

router.post('/add', isAuthenticated, async (req, res) => {
    const {title, url, description} = req.body;
    const { id }  = req.user;
    await connection.query(`INSERT INTO links (title, url, description, user_id) VALUES ("${title}", "${url}", "${description}", ${id});`);    
    req.flash('success', 'Link added successfully');
    res.redirect('/links');
})

//Get the links that I've Saved
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const { id }  = req.user;
        rows = await connection.query(`SELECT * FROM links WHERE user_id = ${id}`);
        res.render('links/list', {rows});  
    } catch (error) {
        console.log(error)
    }
})

//Remove Links
router.get('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        await connection.query(`DELETE FROM links WHERE id = ${id}`);
        req.flash('success', 'Link removed successfully');
        res.redirect('/links');
    } catch (error) {
        console.log(error)
    }
})

//Edit Links
router.get('/edit/:id', isAuthenticated, async(req, res) => {
    try {
        const { id } = req.params;
        rows = await connection.query(`SELECT * FROM links WHERE id = ${id}`);
        linkRequired = rows[0];
        res.render('links/edit', {linkRequired}); 
    }catch (err) {
        console.log(err);
    }
})

router.post('/update/:id', isAuthenticated, async(req, res) => {
    try {
        const { id } = req.params;
        const { title, url, description} = req.body;
        await connection.query(`UPDATE links SET title = "${title}", url = "${url}", description = "${description}" WHERE id = ${id}`);
        req.flash('success', 'Link edited succesfully');
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;