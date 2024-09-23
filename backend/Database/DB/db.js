const mongoose = require('mongoose');

const DataBase = async () => {
    try {
        const conString = process.env.DATABASE_URL || `mongodb+srv://${process.env.USERNAME}:${process.env.DB_PASS}@website.2viiaas.mongodb.net/eccomerce`
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        console.log('Database connected')
    } catch (error) {
        console.log('Database did not connect due to the following error:',error.message)
    }
}

module.exports = DataBase;
