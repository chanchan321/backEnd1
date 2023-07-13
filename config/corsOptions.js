const whitelist = [
    'http://localhost:3000','http://localhost:3001','https://front-end-xvvj.onrender.com/'

];

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
  };

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORSs'));
        }
    },
    config,
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
