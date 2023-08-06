const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000

const authRouter = require('./router/Auth')

const cors = require('cors')



app.use(cors())
app.use(express.json());
app.use('/auth', authRouter.router);



main().catch(err => console.log(err));
async function main() {

    await mongoose.connect('mongodb+srv://umairabid927:umairabid@cluster0.bkhepvb.mongodb.net/authentication');

    console.log('mongodb connected');

}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


