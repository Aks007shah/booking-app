const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelbooking',  {useUnifiedTopology : true, useNewUrlParser: true }).then(()=> console.log('MongoDb is Connected')).catch(()=> console.log('MongoDb is not connected'));
}

module.exports = main;



