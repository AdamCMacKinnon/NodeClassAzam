const express = require('express')
const formidable = require('formidable')
const router = express.Router()
const uuidv1 = require('uuid');

let uniqueFileName = ''

router.get('/add-product', (req, res) => {
  res.render('add-product')
})

function uploadFile(req, callback) {
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name,file)=>{

        uniqueFileName = `${Math.random()}.${file.name.split('.').pop()}`
        file.name = uniqueFileName
        file.path = __basdir + '/uploads/' + uniqueFileName


    })
    .on('file',(name,file)=>{
        callback(file.name)
    })
}


router.post('/upload', (req, res) => {
  uploadFile(req,(photoUrl)=>{
      photoUrl = `/uploads/${photoUrl}`
      res.render('add-product', {imageUrl: photoUrl, className: 'product-preview-image'})

  })
})

module.exports = router;