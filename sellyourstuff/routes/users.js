const express = require('express')
const formidable = require('formidable')
const router = express.Router()
const uuidv1 = require('uuid');
const models = require('../models');

let uniqueFileName = ''

router.get('/add-product', (req, res) => {
  res.render('users/add-product')
})

router.post('/add-product', async (req,res) => {
  let title = req.body.title
  let description = req.body.description
  let price = parseFloat(req.body.price)
  let userId = req.session.user.userId

  let product = models.Product.build({
    title: title,
    description: description,
    price: price,
    userId: userId,
    imageUrl: uniqueFileName
  })

  let persistedProduct = await product.save()
  if(persistedProduct != null) {
    res.redirect('users/products')
  } else {
    res.render('/add-product', {message: 'Unable to add product!'});
  }


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