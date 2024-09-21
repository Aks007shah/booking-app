const express = require("express");
const app = express();
const port = 5000;
const mongoD = require('./mongodb')
const roomroutes = require('./routes/roomroute');
const authroute = require('./routes/authroutes');
const bookingroute = require('./routes/bookingroutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/rooms', roomroutes);
app.use('/api/auth', authroute);
app.use('/api/booking', bookingroute);


mongoD().then(()=>{
    app.listen(port, () => {
        console.log(`Click: http://localhost:${port} using nodemon`);
      });      
})
