const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config()
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> console.log("DATABASE connected"))
  .catch(err => console.log('DATABASE connect error:', err));
const app = express();
const authRouters = require('../server/routes/auth');

app.use(morgan('dev'));
app.use(bodyparser.json());
// if((process.env.NODE_ENV = 'development')) {
//     app.use(cors({origin: `http://localhost:3000`}));
// };
app.use(cors());
app.use('/api', authRouters);
const port  = process.env.PORT || 8000;


app.listen(port, ()=>{
    console.log(`App is running on port ${port}- ${process.env.NODE_ENV}`)
})