let PostModel = require("../models/PostModel");
let AuthMiddleWare = require("../middleware/AuthMiddleWare");
var multer = require('multer');
let baseURL = require("../helper/ServerOriginURL");

let linkImageStore = baseURL + "/images/";

// hàm này lấy về tất cả các poststatus trong database
let findAllPostStatus = async (req, res) => {
    console.log("đã đi đến findAllPostStatus trong PostStatusController");
      
        try {
          //console.log(req);
          PostModel.findAllPostStatus().then((data) => {
            if (data === 'dont exist any poststatus') {
              return res.status(200).json({posts: "dont exist any poststatus"});
            }

            for(let i = 0; i < data.length; i++) {
              // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh post thì phải chỉnh full link ảnh post cũng ở chỗ này luôn nhé.
              let makeFullImagepathURL = linkImageStore + data[i].imagepath;
              data[i].imagepath = makeFullImagepathURL;

              let makeFullPostImagepathURL = linkImageStore + data[i].postimagepath;
              data[i].postimagepath = makeFullPostImagepathURL;
            }
  
            let posts = Object.assign({}, data);
            //console.log({posts: posts});
            res.status(200).json({posts: posts});
          });
          
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
}

// console.log("test 1: " + req.body.data);
//   console.log("test 2: " + filename);

let insertPostStatus = async (req, res, filename) => {
  console.log("đã đi đến insertPostStatus trong PostStatusController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      
      // console.log("test 1: " + req.body.dataTextContent);
      // console.log("test 2: " + req.body.userid);
      

      PostModel.insertPostStatus(req.body.userid, req.body.dataTextContent)
      .then((data) => {
        // if (data === 'insert success') {
        //   return res.status(200).json({isSuccess: true});
        // }
        PostModel.insertImageToPostImage(data, filename).then((data) => {
          if (data === 'insert success') {
            return res.status(200).json({isSuccess: true});
          }
        });
      });

      console.log(req.body);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
}

let getCommentByPostId = async (req, res) => {
  console.log("đã đi đến getCommentByPostId trong PostStatusController");
  try {
    // còn nữa làm chưa xong
    PostModel.getCommentByPostId(req.body.postid)
    .then((data) => {
      
      if (data === 'dont exist any comment in this post') {
        return res.status(200).json({comment: "dont exist any comment"});
      }
      
      for(let i = 0; i < data.length; i++) {
        // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh post thì phải chỉnh full link ảnh post cũng ở chỗ này luôn nhé.
        let makeFullImagepathURL = linkImageStore + data[i].imagepath;
        data[i].imagepath = makeFullImagepathURL;

      }

      let comment = Object.assign({}, data);
      //console.log({posts: posts});
      res.status(200).json({comment: comment});

    });
    //console.log(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

let insertComment = async (req, res) => {
  console.log("đã đi đến insertComment trong PostStatusController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      console.log(req.body);
      PostModel.insertComment(req.body.userid, req.body.postid, req.body.commentcontent)
      .then((data) => {
        if (data === 'insert success') {
          return res.status(200).json({isSuccess: true});
        }
      });
      console.log(req.body);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
}

let deletePostByPostid = async (req, res) => {
  console.log("đã đi đến deletePostByPostid trong PostStatusController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      console.log(req.body);
      PostModel.deletePostByPostid(req.body.postid)
      .then((data) => {
        if (data === 'delete success') {
          return res.status(200).json({isDelete: true});
        }
      });
      console.log(req.body);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
}

let deletePostImageByPostid = async (req, res) => {
  console.log("đã đi đến deletePostImageByPostid trong PostStatusController");
  AuthMiddleWare.isAuth(req, res, function() {
    try {
      console.log(req.body);
      PostModel.deletePostImageByPostid(req.body.postid)
      .then((data) => {
        if (data === 'delete success') {
          return res.status(200).json({isDelete: true});
        }
      });
      console.log(req.body);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
}

module.exports = {
    findAllPostStatus: findAllPostStatus,
    insertPostStatus: insertPostStatus,
    // uploadImagePostStatus: uploadImagePostStatus,
    getCommentByPostId: getCommentByPostId,
    insertComment: insertComment,
    deletePostByPostid: deletePostByPostid,
    deletePostImageByPostid: deletePostImageByPostid
}