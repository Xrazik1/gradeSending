const excel2json = require("js2excel").excel2json;
const express = require('express');
const router = express.Router();

const multer = require("multer");

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', async (req, res) => {
    var storage = multer.diskStorage({
        destination: "../loadedFiles"
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Error');
        } else {
            excel2json(req.files[0], (data) => {
                let keys = Object.keys(data);
                data = data[keys[0]];
        
                let empty = 0;
        
                for (let prop in data){
                    for(let row in data[prop]){
                        if(data[prop][row] == ""){
                            empty += 1;
                        }
                    }
                    if(empty >= 2){
                        delete data[prop];
                    }else{
                        continue;
                    }
                }
                res.end(data);
            });


        }
    });
    
});






module.exports = router;