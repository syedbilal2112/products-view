
const loginController = require('../controller/loginController');
const productController = require('../controller/productController');
const categoryController = require('../controller/categoryController');

const passport = require('passport');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname)
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'text/csv') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



async function router(expressApp) {

    expressApp.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
        if (req.user.message) {
            res.json({
                message: 'Signup successful'
            })
        } else {
            res.json({
                message: 'Signup failed'
            })
        }
    })

    expressApp.post('/login', loginController.authenticated);

    expressApp.get('/product', productController.getProduct);
    expressApp.get('/getAllProduct', productController.getAllProduct);
    expressApp.get('/product/:id', productController.getProductById);
    expressApp.post('/product', upload.single('productImage'), productController.addProduct);
    expressApp.delete('/product/:id', productController.deleteProduct);
    expressApp.put('/product', upload.single('productImage'), productController.updateProduct);


    expressApp.get('/category', categoryController.getCategory);
    expressApp.get('/categoryByCat', categoryController.getCategoryByCat);
    expressApp.get('/categories', categoryController.getCategoryById);
    expressApp.post('/category', categoryController.addCategory);
    expressApp.delete('/category/:id', categoryController.deleteCategory);
    expressApp.put('/category', categoryController.updateCategory);

    expressApp.get('/qrCodeScanner', productController.qrCodeScanner);
    

}



/*
 * export to others
 */
exports.router = router;