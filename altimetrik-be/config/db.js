const mongoose = require('mongoose');
const db = 'mongodb+srv://madhukar:madhukar@cluster0-4mip2.mongodb.net/test?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;