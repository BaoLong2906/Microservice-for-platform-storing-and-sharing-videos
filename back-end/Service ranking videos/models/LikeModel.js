const connectDB = require('../database/ConnectDB');
let CountDislikeAndLikeOfVideo = require('../helper/CountDislikeAndLikeOfVideo');

class LikeModel {
    constructor(id, videoid, userid) {
        this.id = id;
        this.videoid = videoid;
        this.userid = userid;
    }

    static insertLikeVideo (userid, videoid) {
        return new Promise((resolve, reject) => {
            let stringQuery = "INSERT INTO likevideo (id, videoid, userid, createtime, updatetime) VALUES (NULL, " + videoid + ", " + userid + ", NOW(), NOW())";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    console.log(error);
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                
                resolve('insert success');
            });
        });
    }

    static removeLikeVideo (userid, videoid) {
        return new Promise((resolve, reject) => {
            let stringQuery = "DELETE FROM likevideo WHERE userid=" + userid + " AND videoid=" + videoid;
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

    static getInforLikeAndDislike (userid, videoid) {
        return new Promise((resolve, reject) => {
            let object = CountDislikeAndLikeOfVideo(userid, videoid, connectDB);
            
            resolve(object);
        })
    }

    static checkUserLiked (userid, videoid) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT * FROM likevideo WHERE userid=" + userid + " AND videoid=" + videoid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist');
                }

                resolve('exist');
            });
        });
    }

}

module.exports = LikeModel;