const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

const server = http.createServer(app);

server.listen(port);