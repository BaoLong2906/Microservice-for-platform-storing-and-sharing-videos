const connectDB = require('../database/ConnectDB');

class DislikeModel {
    constructor(id, videoid, userid) {
        this.id = id;
        this.videoid = videoid;
        this.userid = userid;
    }

    static insertDislikeVideo (userid, videoid) {
        return new Promise((resolve, reject) => {
            let stringQuery = "INSERT INTO dislikevideo (id, videoid, userid, createtime, updatetime) VALUES (NULL, " + videoid + ", " + userid + ", NOW(), NOW())";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    console.log(error);
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                
                resolve('remove success');
            });
        });
    }

    static removeDislikeVideo (userid, videoid) {
        return new Promise((resolve, reject) => {
            let stringQuery = "DELETE FROM dislikevideo WHERE userid=" + userid + " AND videoid=" + videoid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    console.log(error);
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                
                resolve('delete success');
            });
        });
    }

    static checkUserDisliked (userid, videoid) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT * FROM dislikevideo WHERE userid=" + userid + " AND videoid=" + videoid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                console.log(result.length);
                if (result.length === 0) {
                   console.log('okok'); 
                    return resolve('dont exist');
                }

                resolve('exist');
            });
        });
    }

}

module.exports = DislikeModel;