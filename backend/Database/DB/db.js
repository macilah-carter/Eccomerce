const mongoose = require('mongoose');

const DataBase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        console.log('Database connected')
    } catch (error) {
        console.log('Database did not connect due to the following error:',error.message)
    }
}

module.exports = DataBase;