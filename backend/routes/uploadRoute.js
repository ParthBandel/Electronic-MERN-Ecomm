const path = require('path');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const e = require('express');

const router = express.Router()

router.use(cors()); 

var upload = multer({dest: "../../uploads/"})  //D:\Krisha\WebDevelopment\Electronics-part\uploads

router.post("/products/uploads",upload.single("file"), async(req, res) => {
  try {
    if(req.file){
      res.send({
        status: true, 
        message: "File Uploaded"
      });
    } else{
      res.status(400).send({
        status: false,
        data : "File not found"
      });
    }
  } catch(e){
    res.status(500).send(err);
  }
})

module.exports = router;