const connectDB = require('../database/ConnectDB');
var List = require("collections/list");
const e = require('express');

class User {
    constructor(id, email, username, role) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.role = role;
    }

    set setEmail(email) {
        this.email = email;
    }

    get getEmail() {
        return this.email;
    }

    set username(username) {
        this.username = this.username;
    }

    get getUsername() {
        return this.username;
    }

    set setRole(role) {
        this.role = role;
    }

    get getRole() {
        return this.role;
    }

    static getAll(callback) {

        connectDB.query("SELECT * FROM users", function(error, result){
            if (error) {
                //result(null);
                console.log("fail");
                return;
            } else {
                console.log("thanh cong");
                //console.log(result);
                callback(result);
            }
        }); 
    }

   
    // hàm lấy user infor với email và password. 
    static getUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT * FROM users WHERE email='" + email + "'and password=" + password;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return reject('dont exist account with that email or password like that');
                }

                console.log('have someone login with this infor');
                resolve(result[0]);
            });
        });
    }

    // hàm lấy ra tất cả các ảnh thuộc về một user nào đó
    static getAllImagesOfUserByUsername(username) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT users.id, users.email, users.username, users.profileurl, users.role, userimages.imagepath FROM users, userimages WHERE users.id = userimages.userid and users.username = '" + username + "'";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return reject('dont exist image form user have username like that');
                }

                console.log('have someone login with this infor');
                resolve(result);
            });
        });
    }

    // hàm lấy ra bài blog about me của 1 user nào đó.
    static getBlogAboutmeByIdUser(idUser) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT * FROM aboutme WHERE userid=" + idUser;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any blog about from user have idUser like that');
                }

                console.log('have someone need blog aboutme of this idUser');
                resolve(result[0]);
            });
        });
    }


    static insertTokenCopied(accessToken, refreshToken, userId) {
        return new Promise((resolve, reject) => {
            let stringQuery = "INSERT INTO access (id, user-id, accesstoken, refreshtoken, create-time-token, create-time, update-time)";
        });
    }

    // hàm trả về thông tin user thông qua username, được dùng để hiện thị trên profile.
    static findProfileDataByProfileUrl(profileurl) {
        return new Promise((resolve, reject) => {

            let stringQuery = "SELECT users.id, users.email, users.username, users.profileurl, users.role, userimages.imagepath FROM users, userimages WHERE users.id = userimages.userid and users.profileurl = '" + profileurl + "'";
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return reject('dont exist any info with that username like that');
                }

                resolve(result[0]);
            });
        });
    }

    // hàm này dành cho sign-up, kiểm tra xem username hay email đăng ký đã tồn tại trong cơ sỡ dự diệu hay chưa
    static doThisUsernameOrEmailExist(username, email) {
        return new Promise((resolve, reject) => {
            let stringQuery;
            connectDB.query(stringQuery, function(error, result) {
                if (true) {
                    reject('exist');
                } else {
                    resolve('not exist');
                }
            });
            
        });
    }

    static updateBlogAboutmeById(userid, content) {
        return new Promise((resolve, reject) => {

            let stringQuery = "UPDATE aboutme SET content='" + content + "' WHERE userid = " + userid;
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                resolve('update success');
            });
        });
    }

    static insertBlogAboutmeById(userid, content) {
        return new Promise((resolve, reject) => {
            console.log(userid);
            console.log(content);

            let stringQuery = "INSERT INTO aboutme (id, userid, content) VALUES (NULL, " + userid + ", '" + content + "')";
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                resolve('insert success');
            });
        });
    }

    static findAllCourseByProfileUrl(profileurl) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT users.id as userid, users.profileurl, courses.id as courseid, courses.coursename, courses.description, courses.thumbnailpath as coursethumbnailpath, courses.createtime, courses.updatetime FROM users, courses WHERE users.id = courses.userid AND users.profileurl= '" + profileurl + "'";
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any courses info with that profileurl like that');
                }

                resolve(result);
            });
        });
    }

    static findAllVideoByProfileUrl(profileurl) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT videos.id as videoid, videos.courseid, videos.videoname, videos.description, videos.thumbnailpath as videothumbnailpath, videos.createtime, videos.updatetime, users.id as userid, users.username, users.profileurl FROM videos, users, courses WHERE videos.courseid = courses.id AND users.id = courses.userid AND users.profileurl ='" + profileurl + "'";
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any videos info with that profileurl like that');
                }

                resolve(result);
            });
        });
    }

}

module.exports = User;