const express = require('express');
const router = express.Router();
const connection = require('../database');
const { isAuthenticated } = require('../lib/helpers');

//Importing Shared Links Selection
router.post('/upload-links', isAuthenticated, async (req, res) => {
    try {
        const links = req.body;
        const { id } = req.user;
        let e = 0;
        let values = "";

        //Creating Object for more than one link added
        await links.forEach(l => {
            e++
            if(e === links.length){
                let link = `("${l.title}", "${l.url}", "${l.description}", "${l.user_id}", ${id});`
                values += link;
                return;
            }

            let link = `("${l.title}", "${l.url}", "${l.description}", "${l.user_id}", ${id}),`
            values += link;
        });

        //Databasa Query
        const rows = await connection.query(`INSERT INTO shared (title, ulr, description, sharedBy, clientId) VALUES ${values}`);
        res.redirect('/shared');
    } catch (error) {
        console.log(error);        
    }
})

//Get Imported Links
router.get('/', isAuthenticated, async(req, res) => {
    try {
        const { id } = req.user;
        const rows = await connection.query(`SELECT * FROM shared WHERE clientId = ${id}`);
        res.render('shared/shared', {rows});
    } catch (error) {
        console.log(error)
    }
})

//Delete Shared Links
router.get('/delete/:linkId', isAuthenticated, async (req, res) => {
    try {
        const { linkId } = req.params; 
        const { id } = req.user;
        await connection.query(`DELETE FROM shared WHERE id = ${linkId} AND clientId = ${id};`); 
        res.redirect('/shared');
    } catch (error) {
        console.log(error);
    }  
})

module.exports = router;
