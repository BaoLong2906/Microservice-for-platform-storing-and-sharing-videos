const connectDB = require('../database/ConnectDB');
var List = require("collections/list");

class Post {
    constructor(id, userid, textcontent, postpath, createtime, updatetime) {
        this.id = id;
        this.userid = userid;
        this.textcontent = textcontent;
        this.postpath = postpath;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }
    
    set setId(id) {
        this.id = id;
    }

    get getId() {
        return this.id;
    }

    set setUserId(userid) {
        this.userid = userid;
    }

    get getUserId() {
        return this.userid;
    }

    set setTextContent(textcontent) {
        this.textcontent = textcontent;
    }

    get getTextContent() {
        return this.textcontent;
    }

    set setPostPath(postpath) {
        this.postpath = postpath;
    }

    get getPostPath() {
        return this.postpath;
    }

    set setCreatetime(createtime) {
        this.createtime = createtime;
    }

    get getCreatetime() {
        return this.createtime;
    }

    set setUpdatetime(updatetime) {
        this.updatetime = updatetime;
    }

    get getUpdatetime() {
        return this.updatetime;
    }

    // hàm này lấy tất cả post ở trong bảng posts. 
    static findAllPostStatus() {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "SELECT posts.id, posts.userid, posts.textcontent, posts.createtime, posts.updatetime, users.username, userimages.imagepath, postimage.postimagepath FROM posts, postimage, users, userimages WHERE posts.userid = users.id AND users.id = userimages.userid AND posts.id = postimage.postid";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any poststatus');
                }

                console.log('have found poststatus');
                resolve(result);
            });
        });
    }

    // hàm này lưu các poststatus và ảnh của nó nếu có.
    static insertPostStatus(userid, textcontent) {
        return new Promise((resolve, reject) => {
            let stringQuery = "INSERT INTO posts (id, userid, textcontent, createtime, updatetime) VALUES (NULL, " + userid + ", '" + textcontent + "', NOW(), NOW()); SELECT LAST_INSERT_ID() AS lastid";
            connectDB.query(stringQuery, [1,2], function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    console.log(error);
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                console.log("vui vler: " + JSON.stringify(result[1][0].lastid));
                resolve(result[1][0].lastid);
            });
        });
    }

    // hàm này thực hiện việc lưu ảnh poststatus vào bảng postimage
    static insertImageToPostImage(postid, postimagepath) {
        
        return new Promise((resolve, reject) => {
            let stringQuery = "INSERT INTO postimage (id, postid, postimagepath, createtime, updatetime) VALUES (NULL, " + postid + ", '" + postimagepath + "', NOW(), NOW())";
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

    static getCommentByPostId(postid) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "SELECT comments.id, comments.userid, comments.postid, comments.commentcontent, userimages.imagepath, users.username FROM comments, users, userimages WHERE comments.userid = users.id AND users.id = userimages.userid AND postid = " + postid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any comment in this post');
                }

                console.log('have found comment in this postid');
                resolve(result);
            });
        });
    }

    static insertComment(userid, postid, commentcontent) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "INSERT INTO comments (id, userid, postid, commentcontent, createtime, updatetime) VALUES (NULL, " + userid + ", " + postid + ", '"+ commentcontent+"' , NOW(), NOW())";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                resolve('insert success');
            });
        });
    }

    static deletePostByPostid(postid) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "DELETE FROM posts WHERE id="+postid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                resolve('delete success');
            });
        });
    }

    static deletePostImageByPostid(postid) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "DELETE FROM postimage WHERE postid="+postid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }

                resolve('delete success');
            });
        });
    }

    //`SELECT * FROM comments WHERE id < ".$_POST['id']." AND id_post = ".$id_post." ORDER BY id DESC LIMIT ".$showLimit`

}

module.exports = Post;