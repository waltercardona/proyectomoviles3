require('dotenv').config();

const app = require('./server');

console.log(process.env.TESTING)

app.listen(app.get('port'), () => {
    console.log('Server on Port:', app.get('port'))
})