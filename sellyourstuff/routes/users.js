const express = require('express')
const formidable = require('formidable')
const router = express.Router()
const uuidv1 = require('uuidv1');

let uniqueFileName = ''

router.get('/add-product', (req, res) => {
  res.render('add-product')
})

function uploadFile(req, callback) {
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name,file)=>{

        uniqueFileName = `${uuid()}.${file.name.split('.').pop()}`
        file.name = uniqueFileName
        file.path = __basdir + '/uploads/' + uniqueFileName


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