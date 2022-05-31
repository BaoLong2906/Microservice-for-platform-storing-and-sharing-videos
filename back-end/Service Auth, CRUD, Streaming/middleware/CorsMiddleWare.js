//CORS middleware
const allowCrossDomain = function(req, res, next) {
    console.log('đã đi đến CORS middleware');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');

    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('đã đi qua CORS middleware');
    
    next();
}

module.exports = {
    allowCrossDomain: allowCrossDomain
};
