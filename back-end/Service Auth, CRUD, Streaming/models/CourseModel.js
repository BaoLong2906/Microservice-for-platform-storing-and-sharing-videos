const connectDB = require('../database/ConnectDB');
var List = require("collections/list");

class Course {
    constructor(id, userid, coursename, thumbnailpath, createtime, updatetime) {
        this.id = id;
        this.userid = userid;
        this.coursename = coursename;
        this.thumbnailpath = thumbnailpath;
        this.createtime = createtime;
        this.updatetime = updatetime;
    }

    // hàm này trả về các thông tin các khóa học.
    static findAllCourse() {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "SELECT courses.id as courseid, courses.userid, courses.coursename, courses.description, courses.thumbnailpath, users.username, users.profileurl, courses.createtime, courses.updatetime, userimages.imagepath  FROM courses, users, userimages WHERE courses.userid = users.id and userimages.userid = users.id";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any courses');
                }

                console.log('have found courses');
                resolve(result);
            });
        });
    }

    static findCourseInforByCourseId(courseid) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "SELECT videos.id, videos.courseid, videos.videoname, videos.thumbnailpath as videothumbnailpath, videos.videopath, videos.description as videodescription, courses.description as coursedescription, videos.createtime, videos.updatetime, courses.thumbnailpath as coursethumbnailpath, courses.userid, courses.coursename, users.profileurl, users.username, userimages.imagepath FROM videos, courses, users, userimages WHERE videos.courseid = courses.id AND users.id = userimages.userid AND courses.userid = users.id AND courseid=" + courseid;
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any courses infor with that courseid');
                }

                console.log('have found courses');
                resolve(result);
            });
        });
    }

    static insertCourse(userid, coursename, description, filename) {

        console.log(userid);
        console.log(coursename);
        console.log(description);
        console.log(filename);

        return new Promise((resolve, reject) => {
            let stringQuery = "INSERT INTO courses (id, userid, coursename, description, thumbnailpath, createtime, updatetime) VALUES (NULL, "+ userid + ", '"+coursename+"', '"+description+"', '"+filename+"', NOW(), NOW())";
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

    static findAllCourseByCategoryname(categoryname) {
        return new Promise((resolve, reject) => {
            // let stringQuery = "SELECT * FROM posts";
            let stringQuery = "SELECT courses.id as courseid, courses.userid, courses.coursename, courses.description, courses.thumbnailpath, users.username, users.profileurl, courses.createtime, courses.updatetime, userimages.imagepath FROM courses, users, userimages, coursecategory, category WHERE courses.userid = users.id and userimages.userid = users.id and coursecategory.courseid = courses.id AND coursecategory.categoryid = category.id AND category.categoryname = '"+categoryname+"'";
            connectDB.query(stringQuery, function(error, result){
                if (error) {
                    // lỗi kết nối.
                    console.log('some error happen in connect');
                    
                    //return reject(error);
                    return reject('some error happen in connect');
                }
                if (result.length === 0) {
                    return resolve('dont exist any courses');
                }

                console.log('have found courses');
                resolve(result);
            });
        });
    }

}

module.exports = Course;