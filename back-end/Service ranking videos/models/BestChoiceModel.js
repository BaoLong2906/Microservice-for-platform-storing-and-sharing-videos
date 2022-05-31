const connectDB = require('../database/ConnectDB');

class BestChoiceModel {
    static getTop3() {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT videoid, COUNT(userid) FROM likevideo GROUP BY videoid";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                resolve(result);
            });
        });
    }

}

module.exports = BestChoiceModel;