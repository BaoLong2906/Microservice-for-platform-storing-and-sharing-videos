let PostModel = require("../models/PostModel");
let VideoModel = require("../models/VideoModel");
let AuthMiddleWare = require("../middleware/AuthMiddleWare");
var multer = require('multer');
let StreamService = require("../services/StreamService");
let baseURL = require("../helper/ServerOriginURL");

let linkImageStore = baseURL + "/images/";

let getVideoAndItsStuff = async (req, res) => {
    console.log("đã đi đến getVideoAndItsStuff trong VideoController");
    
        try {
        
            console.log(req.body);
            console.log(req.params.courseid);
            console.log(req.params.videoid);
          
            VideoModel.findVideoPathByVideoId(req.params.videoid).then((data) => {
                StreamService.doStream(req, res, data.videopath);
            });

            // microservice, như vậy không chỉ gửi videoid mà còn phải gửi luôn cả req, và res qua server streaming.

        //   StreamService.doStream(req, res);
        //   VideoModel.findVideoPathByVideoId(req.params.videoid)
        //   .then((data) => {
    
        //     // // thêm dầu hoàn chỉnh cho link ảnh avatar.
        //     // let makeFullImagepathURL = linkImageStore + data.imagepath;
        //     // data.imagepath = makeFullImagepathURL;
    
        //     // let profileData = Object.assign({}, data); 
        //     // console.log({profileData: profileData});
        //     // res.status(200).json({profileData: profileData});

        //     StreamService.doStream(req, res);
                    
        //   }).catch((error) => {
        //     console.log(error);
        //     return res.status(401).json({
        //       message: 'Unauthorized.',
        //     });
        //   });
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({error: error});
        }
    
}


let getAllVideoInforInCourseByCourseId = async (req, res) => {
    console.log("đã đi đến getAllVideoInCourseByCourseId trong VideoController");
    try {
        
        console.log(req.body);
        console.log(req.params.courseid);

        VideoModel.findAllVideoInforInCourseByCourseId(req.params.courseid).then((data) => {
            if (data === 'dont exist any video informantion with that courseid like that') {
                return res.status(200).json({videosinfor: "dont exist any video informantion with that courseid like that"});
            }
        
            for(let i = 0; i < data.length; i++) {
                // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh thumbnail thì phải chỉnh full link ảnh cũng ở chỗ này luôn nhé.
                // let makeFullImagepathURL = linkImageStore + data[i].imagepath;
                // data[i].imagepath = makeFullImagepathURL;
        
                let makeFullCourseThumbnailpathURL = linkImageStore + data[i].coursethumbnailpath;
                data[i].coursethumbnailpath = makeFullCourseThumbnailpathURL;
        
                let makeFullVideoThumbnailpathURL = linkImageStore + data[i].videothumbnailpath;
                data[i].videothumbnailpath = makeFullVideoThumbnailpathURL;
        
                let makeFullVideopathURL = linkImageStore + data[i].videopath;
                data[i].videopath = makeFullVideopathURL;
            }
        
            let videosinfor = Object.assign({}, data);
            //console.log({posts: posts});
            res.status(200).json({videosinfor: videosinfor});
        });

      } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
      }
}

let getAllCommentInVideoByVideoId = async (req, res) => {
    console.log("đã đi đến getAllCommentInVideoByVideoId trong VideoController");
    try {
        console.log(req.body);
        console.log(req.params.videoid);

        VideoModel.findAllCommentInVideoByVideoId(req.params.videoid).then((data) => {
            if (data === 'dont exist any video comment with that videoid like that') {
                return res.status(200).json({videocomments: "dont exist any video comment with that videoid like that"});
            }

            // in construcing.
            for(let i = 0; i < data.length; i++) {
                // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh thumbnail thì phải chỉnh full link ảnh cũng ở chỗ này luôn nhé.
                let makeFullImagepathURL = linkImageStore + data[i].imagepath;
                data[i].imagepath = makeFullImagepathURL;

            }
            
            let videocomments = Object.assign({}, data);
            //console.log({posts: posts});
            res.status(200).json({videocomments: videocomments});
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}

let insertVideoComment = async (req, res) => {
    console.log("đã đi đến insertVideoComment trong VideoController");
    AuthMiddleWare.isAuth(req, res, function() {
        try {
            console.log(req.body);
            VideoModel.insertComment(req.body.videoid, req.body.userid, req.body.commentcontent).then((result) => {
                if (data === 'insert success') {
                    return res.status(200).json({isSuccess: true});
                }
            });
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error});
        } 
    });
}

let getRecommendVideo = async (req, res) => {
    console.log("đã đi đến getRecommendVideo trong VideoController");
    try {
        
        VideoModel.getRecommendVideo().then((data) => {
            if (data === 'dont have any videos to recommend') {
                return res.status(200).json({videocomments: 'dont have any videos to recommend'});
            }

            shuffle(data);

            for(let i = 0; i < data.length; i++) {
                // thêm dầu hoàn chỉnh cho link ảnh avatar, sau có ảnh thumbnail thì phải chỉnh full link ảnh cũng ở chỗ này luôn nhé.
                // let makeFullImagepathURL = linkImageStore + data[i].imagepath;
                // data[i].imagepath = makeFullImagepathURL;
        
                let makeFullCourseThumbnailpathURL = linkImageStore + data[i].coursethumbnailpath;
                data[i].coursethumbnailpath = makeFullCourseThumbnailpathURL;
        
                let makeFullVideoThumbnailpathURL = linkImageStore + data[i].videothumbnailpath;
                data[i].videothumbnailpath = makeFullVideoThumbnailpathURL;
        
                let makeFullVideopathURL = linkImageStore + data[i].videopath;
                data[i].videopath = makeFullVideopathURL;
            }
        
            let videosinfor = Object.assign({}, data);
            //console.log({posts: posts});
            res.status(200).json({videosinfor: videosinfor});
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

let getInforTop3videos = async (req, res) => {
    console.log("đã đi đến getInforTop3videos trong VideoController");
    try {
        VideoModel.getInforTop3videos(req.body.videoidTop1, req.body.videoidTop2, req.body.videoidTop3).then((data) => {
            for(let i = 0; i < data.length; i++) {
        
                // let makeFullVideoThumbnailpathURL = linkImageStore + data[i].videothumbnailpath;
                // data[i].videothumbnailpath = makeFullVideoThumbnailpathURL;
        
                // let makeFullVideopathURL = linkImageStore + data[i].videopath;
                // data[i].videopath = makeFullVideopathURL;

                let makeFullThumbnailpathURL = linkImageStore + data[i].thumbnailpath;
                data[i].thumbnailpath = makeFullThumbnailpathURL;
            }

            let videosinfor = Object.assign({}, data);
            
            return res.status(200).json(videosinfor);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {
    getVideoAndItsStuff: getVideoAndItsStuff,
    getAllVideoInforInCourseByCourseId: getAllVideoInforInCourseByCourseId,
    getAllCommentInVideoByVideoId: getAllCommentInVideoByVideoId,
    insertVideoComment: insertVideoComment,
    getRecommendVideo: getRecommendVideo,
    getInforTop3videos: getInforTop3videos,
};