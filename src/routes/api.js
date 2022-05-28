const express = require('express');
const router = express.Router();
const connection = require('../database');
const { isAuthenticated, getTodayDate, isApiAvailable} = require('../lib/helpers');

//Middlewares
function generateToken() {
    return Math.random().toString(36).substr(2);
}

//Api Routes
router.get('/', isAuthenticated, async (req, res) => {
    const { id } = req.user;
    const rows = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
    let user = rows[0];

    //Look for any api previulsy generated
    try {
        const doesApiExists = await connection.query(`SELECT * FROM api WHERE userApi = ${id};`)
        const api = doesApiExists[0];
        res.render('links/api', { user, api });
    } catch (error) {
        console.log(error);
        res.send('There was a problem searching your API')
    }
    
})

//GET the Link through API tokens 
router.get('/links/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const tokenExist = await connection.query(`SELECT * FROM api WHERE userToken = "${token}"`);
    
        if(tokenExist.length > 0){
            //Authenticate the token by date validity
            const limitDate = new Date(tokenExist[0].availabilityUntil);
            const apiAvailabity = isApiAvailable(limitDate);
            if(!apiAvailabity){
                res.json("API isn't available")
                return;
            }

            userId = tokenExist[0].userApi;        
            const userSharing = await connection.query(`SELECT username FROM users WHERE id = ${userId}`)
            const rows = await connection.query(`SELECT * FROM links WHERE user_id = ${userId}`);

            let i = 0;
            rows.forEach(e => {
                i++
                e.id = i;
                e.creationDate = getTodayDate();
                e.user_id = userSharing[0].username;
            });
            res.json(rows);

        }else{
            res.json("Can't access to this API or the token doesn't exist");
        }

    } catch (error) {
        console.log(error)
        res.json("Cannot access to this API, please contact support and we'll help you out ;)");
    }      
})

//Create an API through tokens
router.post('/add', async (req, res) => {
    const { id } = req.user;
    const { availability } = req.body;
    const newToken = generateToken();
    anyRow = await connection.query(`SELECT * FROM API WHERE userApi = ${id}`);
       
    if(anyRow.length > 0){  //Update API
        const rowId = anyRow[0].id;
        const todayDate = getTodayDate();
        await connection.query(`UPDATE api SET userToken = "${newToken}" , updatedTime = "${todayDate}" , availabilityUntil = "${availability}" WHERE id = ${rowId};`);
        req.flash('success', 'API updated successfully');
        res.redirect('/api');
    }else{ //Create API
        await connection.query(`INSERT INTO api (userToken, availabilityUntil, userApi) VALUES ("${newToken}", ${availability}, ${id});`);
        req.flash('success', 'API created successfully');
        res.redirect('/api');
    }
})

//Consume the API through tokens - Downloading & Sharing Content
router.post('/download', async (req, res) => {
    try {
        const token = req.body.token;
        if(token.length > 40){
            res.render('shared/import', {token})
        }else{
            req.flash('message', 'Input a valid API adress');
            res.redirect('/api');
        }
    } catch (e) {
        console.log(e)
    }    
})

module.exports = router;