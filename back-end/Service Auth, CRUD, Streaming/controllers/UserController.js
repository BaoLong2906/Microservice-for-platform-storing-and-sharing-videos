let UserModel = require("../models/UserModel");
let AuthMiddleWare = require("../middleware/AuthMiddleWare");

let baseURL = require("../helper/ServerOriginURL");
let linkImageStore = baseURL + "/images/";

// yêu cầu trả về thông tin user phục vụ cho page profile dựa trên tham số profileURL.
let findProfileDataByProfileUrl = async (req, res) => {
  console.log("đã đi đến findProfileDataByProfileUrl trong UserController");
  //AuthMiddleWare.isAuth(req, res, function() {
    try {
    
      console.log(req.body);
      console.log(req.params.profileurl);

      UserModel.findProfileDataByProfileUrl(req.params.profileurl)
      .then((data) => {

        // thêm dầu hoàn chỉnh cho link ảnh avatar.
        let makeFullImagepathURL = linkImageStore + data.imagepath;
        data.imagepath = makeFullImagepathURL;

        let profileData = Object.assign({}, data); 
        console.log({profileData: profileData});
        res.status(200).json({profileData: profileData});
                
      }).catch((error) => {
        console.log(error);
        return res.status(401).json({
          message: 'Unauthorized.',
        });
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error});
    }
  //});
}

// yêu cầu trả về blog about của 1 user nào đó.
let findBlogAboutmeById = async (req, res) => {
  console.log("đã đi đến findBlogAboutmeById trong UserController");
    //AuthMiddleWare.isAuth(req, res, function() {
      try {
        console.log(req);
        UserModel.getBlogAboutmeByIdUser(req.body.userid).then((data) => {
          if (data === 'dont exist any blog about from user have idUser like that') {
            return res.status(200).json({userBlogAboutContent: "doAskInsert"});
          }

          userBlogAboutContent = Object.assign({}, data);
          res.status(200).json({userBlogAboutContent: userBlogAboutContent});
        });
        
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    //});
}

// hàm cập nhật và tạo bài viết aboutme.
let updateBlogAboutmeById = async (req, res) => {
  console.log("đã đi đến updateBlogAboutmeById trong UserController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      console.log(req.body);
      console.log(req.params.userid);

      UserModel.updateBlogAboutmeById(req.params.userid, req.body.content).then((result) => {
        if (result === 'update success') {
          res.status(200).json({exist: true});
        }
      }).catch((error) => {
        if (error === 'some error happen in connect') {
          res.status(500).json({exist: false});
        }
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

}

// hàm thêm bài viết aboutme.
let insertBlogAboutmeById = async (req, res) => {
  console.log("đã đi đến insertBlogAboutmeById trong UserController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      console.log(req.body);
      console.log(req.params.userid);

      UserModel.insertBlogAboutmeById(req.params.userid, req.body.content).then((result) => {
        
        if (result === 'insert success') {
          res.status(200).json({exist: true});
        }
      }).catch((error) => {
        console.log(error);
        if (error === 'some error happen in connect') {
          res.status(500).json({exist: false});
        }
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
}

let findAllCourseByProfileUrl = async (req, res) => {
  console.log("đã đi đến findAllCourseByProfileUrl trong UserController");
  
  try {

    UserModel.findAllCourseByProfileUrl(req.body.profileurl).then((data) => {

      if (data === 'dont exist any courses info with that profileurl like that') {
        return res.status(200).json({courses: 'dont exist any courses info with that profileurl like that'});
      }
  
      for(let i = 0; i < data.length; i++) {
  
        let makeFullCourseThumbnailpathURL = linkImageStore + data[i].coursethumbnailpath;
        data[i].coursethumbnailpath = makeFullCourseThumbnailpathURL;

      }
  
      let courses = Object.assign({}, data);

      res.status(200).json({courses: courses});
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  
}

let findAllVideoByProfileUrl = async (req, res) => {
  console.log("đã đi đến findAllVideoByProfileUrl trong UserController");

  try {
    
    UserModel.findAllVideoByProfileUrl(req.body.profileurl).then((data) => {
      if (data === 'dont exist any videos info with that profileurl like that') {
        return res.status(200).json({videos: 'dont exist any videos info with that profileurl like that'});
      }
  
      for(let i = 0; i < data.length; i++) {
  
        let makeFullVideoThumbnailpathURL = linkImageStore + data[i].videothumbnailpath;
        data[i].videothumbnailpath = makeFullVideoThumbnailpathURL;

      }
  
      let videos = Object.assign({}, data);

      res.status(200).json({videos: videos});
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

}

module.exports = {
  findProfileDataByProfileUrl: findProfileDataByProfileUrl,
  findBlogAboutmeById: findBlogAboutmeById,
  updateBlogAboutmeById: updateBlogAboutmeById,
  insertBlogAboutmeById: insertBlogAboutmeById,
  findAllCourseByProfileUrl: findAllCourseByProfileUrl,
  findAllVideoByProfileUrl: findAllVideoByProfileUrl
};