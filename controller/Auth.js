const jwt = require('jsonwebtoken');
const Product = require('../model/Authentication')
const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../private.key'), 'utf-8')




exports.signUp = (req, res,) => {

    const product = new Product(req.body)
    var token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
    const hash = bcrypt.hashSync(req.body.password, 10);
    product.password = hash;
    product.token = token;
    product.save();
    res.json(product)

}

exports.login = async (req, res) => {
    try {
        const userLoggedIn = await Product.findOne({ email: req.body.email });
        const isAuth = bcrypt.compareSync(req.body.password, userLoggedIn.password);
        if (isAuth) {
            var token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });

            userLoggedIn.token = token
            userLoggedIn.save();
            res.json(userLoggedIn);
        } else {
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }


}
