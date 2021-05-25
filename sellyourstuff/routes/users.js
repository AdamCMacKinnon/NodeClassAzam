const express = require('express')
const formidable = require('formidable')
const router = express.Router()

router.get('/add-product', (req, res) => {
  res.render('add-product')
})

function uploadFile(req, callback) {
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name,file)=>{
        __dirname
        file.path = __basdir + '/uploads/' + file.name

    })
    .on('file',(name,file)=>{
        callback(file.name)
    })
}

router.post('/upload', (req, res) => {
  uploadFile(req,(photoUrl)=>{
      res.send("UPLOAD")

  })
})

module.exports = router;