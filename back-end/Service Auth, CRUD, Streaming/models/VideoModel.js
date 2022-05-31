const connectDB = require('../database/ConnectDB');
var List = require("collections/list");

class Video {
    constructor(id, courseid, videoname, thumbnailpath, videopath, description, createtime, updatetime) {
        this.id = id;
        this.courseid = courseid;
        this.videoname = videoname;
        this.thumbnailpath = thumbnailpath;
        this.videopath = videopath;
        this.description = description;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }

    // hàm trả về đường dẫn của video.
    static findVideoPathByVideoId (videoid) {
        return new Promise((resolve, reject) => {

            let stringQuery = "SELECT * FROM videos WHERE id=" + videoid;
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return reject('dont exist any video with that videoid like that');
                }

                resolve(result[0]);
            });
        });
    }

    // hàm trả về thông tin các video trong 1 khóa học nào đó với courseid.
    static findAllVideoInforInCourseByCourseId (courseid) {
        return new Promise((resolve, reject) => {

            let stringQuery = "SELECT users.username, courses.id AS courseid, courses.userid, courses.coursename, courses.description as coursedescription, courses.thumbnailpath as coursethumbnailpath, videos.id as videoid, videos.videoname, videos.thumbnailpath AS videothumbnailpath, videos.videopath, videos.description AS videodescription, videos.createtime, videos.updatetime FROM courses, videos, users WHERE courses.id = videos.courseid AND users.id = courses.userid AND courseid=" + courseid;
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return reject('dont exist any video informantion with that courseid like that');
                }

                resolve(result);
            });
        });
    }

    static findAllCommentInVideoByVideoId (videoid) {
        return new Promise((resolve, reject) => {

            let stringQuery = "SELECT videos.id AS videoid, videocomments.id as videocommentid, videocomments.userid, videocomments.commentcontent, videocomments.createtime, videocomments.updatetime, userimages.imagepath, users.username, users.profileurl FROM videos, videocomments, users, userimages WHERE videocomments.userid = users.id AND userimages.userid = users.id AND videocomments.videoid = videos.id AND videoid =" + videoid;
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any video comment with that videoid like that');
                }

                resolve(result);
            });
        });
    }


    static insertComment(videoid, userid, commentcontent) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "INSERT INTO videocomments (id, videoid, userid, commentcontent, createtime, updatetime) VALUES (NULL, " + videoid + ", " + userid + ", '"+ commentcontent+"' , NOW(), NOW())";
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

    static getRecommendVideo() {
        return new Promise((resolve, reject) => {

            let stringQuery = "SELECT users.username, courses.id AS courseid, courses.userid, courses.coursename, courses.description as coursedescription, courses.thumbnailpath as coursethumbnailpath, videos.id as videoid, videos.videoname, videos.thumbnailpath AS videothumbnailpath, videos.videopath, videos.description AS videodescription, videos.createtime, videos.updatetime FROM courses, videos, users WHERE courses.id = videos.courseid";
            connectDB.query(stringQuery, function(error, result) {
                if (error) {
                    // không tìm thấy sự tồn tại của tài khoản trên.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont have any videos to recommend');
                }

                resolve(result);
            });
        });
    }

    static getInforTop3videos(videoidTop1, videoidTop2, videoidTop3) {
        return new Promise((resolve, reject) => {
            let stringQuery = "SELECT * FROM videos WHERE id=" + videoidTop1 + " OR id=" + videoidTop2 + " OR id=" + videoidTop3;
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

module.exports = Video;