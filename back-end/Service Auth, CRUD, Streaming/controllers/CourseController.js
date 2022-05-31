let UserModel = require("../models/UserModel");
let CourseModel = require("../models/CourseModel");
let AuthMiddleWare = require("../middleware/AuthMiddleWare");
let baseURL = require("../helper/ServerOriginURL");

let linkImageStore = baseURL + "/images/";

// hàm này lấy về tất cả các poststatus trong database
let findAllCourse = async (req, res) => {
    console.log("đã đi đến findAllCourse trong CourseController");
        // chưa code xong, vẫn còn bảng mẫu.
        try {
          //console.log(req);
          CourseModel.findAllCourse().then((data) => {
            if (data === 'dont exist any courses') {
              return res.status(200).json({courses: "dont exist any courses"});
            }

            for(let i = 0; i < data.length; i++) {
              // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh thumbnail thì phải chỉnh full link ảnh cũng ở chỗ này luôn nhé.
              let makeFullImagepathURL = linkImageStore + data[i].imagepath;
              data[i].imagepath = makeFullImagepathURL;

              let makeFullThumbnailpathURL = linkImageStore + data[i].thumbnailpath;
              data[i].thumbnailpath = makeFullThumbnailpathURL;
            }
  
            let courses = Object.assign({}, data);
            //console.log({posts: posts});
            res.status(200).json({courses: courses});
          });
          
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
}

let findCourseInforByCourseId = async (req, res) => {
  console.log("đã đi đến findCourseInforByCourseId trong CourseController");
  // chưa code xong, vẫn còn bảng mẫu.
  try {
    //console.log(req);
    CourseModel.findCourseInforByCourseId(req.body.courseid).then((data) => {
      if (data === 'dont exist any courses infor with that courseid') {
        return res.status(200).json({coursesinfor: "dont exist any courses infor with that courseid"});
      }

      for(let i = 0; i < data.length; i++) {
        // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh thumbnail thì phải chỉnh full link ảnh cũng ở chỗ này luôn nhé.
        let makeFullImagepathURL = linkImageStore + data[i].imagepath;
        data[i].imagepath = makeFullImagepathURL;

        let makeFullCourseThumbnailpathURL = linkImageStore + data[i].coursethumbnailpath;
        data[i].coursethumbnailpath = makeFullCourseThumbnailpathURL;

        let makeFullVideoThumbnailpathURL = linkImageStore + data[i].videothumbnailpath;
        data[i].videothumbnailpath = makeFullVideoThumbnailpathURL;

        let makeFullVideopathURL = linkImageStore + data[i].videopath;
        data[i].videopath = makeFullVideopathURL;
      }

      let coursesinfor = Object.assign({}, data);
      //console.log({posts: posts});
      res.status(200).json({coursesinfor: coursesinfor});
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

let insertCourse = async (req, res, filename) => {
  console.log("đã đi đến insertCourse trong CourseController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      console.log(req.body);
      CourseModel.insertCourse(req.body.userid, req.body.coursename, req.body.coursedescription, filename)
      .then((data) => {
        if (data === 'insert success') {
          return res.status(200).json({isSuccess: true});
        }
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }); 
}

let findAllCourseByCategoryname = async (req, res) => {
  console.log("đã đi đến findAllCourseByCategoryname trong CourseController");
        // chưa code xong, vẫn còn bảng mẫu.
        try {
          //console.log(req);
          CourseModel.findAllCourseByCategoryname(req.body.categoryname).then((data) => {
            if (data === 'dont exist any courses') {
              return res.status(200).json({courses: "dont exist any courses"});
            }

            for(let i = 0; i < data.length; i++) {
              // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh thumbnail thì phải chỉnh full link ảnh cũng ở chỗ này luôn nhé.
              let makeFullImagepathURL = linkImageStore + data[i].imagepath;
              data[i].imagepath = makeFullImagepathURL;

              let makeFullThumbnailpathURL = linkImageStore + data[i].thumbnailpath;
              data[i].thumbnailpath = makeFullThumbnailpathURL;
            }
  
            let courses = Object.assign({}, data);
            //console.log({posts: posts});
            res.status(200).json({courses: courses});
          });
          
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
}



module.exports = {
    findAllCourse: findAllCourse,
    findCourseInforByCourseId: findCourseInforByCourseId,
    insertCourse: insertCourse,
    findAllCourseByCategoryname: findAllCourseByCategoryname,
}