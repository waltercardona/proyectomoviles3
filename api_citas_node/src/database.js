const mongoose = require('mongoose')

const { CITAS_APP_MONGODB_HOST, CITAS_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${CITAS_APP_MONGODB_HOST}/${CITAS_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));