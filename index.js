const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
}).single('productImage');

app.set('view engine', 'ejs');

app.use(express.static('public'));

let products = [
  { name: 'Gourav Rana', description: 'black lives matter', image: '/uploads/1730694414183.jpg' },
];

app.get('/', (req, res) => {
  res.render('catalog', { products: products });
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send('Error uploading image');
    }
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`
    };
    products.push(newProduct);
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
