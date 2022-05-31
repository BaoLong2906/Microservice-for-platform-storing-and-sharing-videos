let LikeModel = require('../models/LikeModel');

let baseURL = require("../helper/ServerOriginURL");
let linkImageStore = baseURL + "/images/";

let insertLikeVideo = async (req, res) => {
  console.log("đã đi đến insertLikeVideo trong LikeController");
  try {
    console.log(req.body.userid + " " + req.body.videoid);
    LikeModel.insertLikeVideo(req.body.userid, req.body.videoid).then((data) => {
      if (data == 'insert success') {
        return res.status(200).json({isSuccess: true});
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

let removeLikeVideo = async (req, res) => {
  console.log("đã đi đến removeLikeVideo trong LikeController");
  try {
    console.log(req.body.userid + " " + req.body.videoid);
    LikeModel.removeLikeVideo(req.body.userid, req.body.videoid).then((data) => {
      if (data == 'remove success') {
        return res.status(200).json({isSuccess: true});
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}


let getInforLikeAndDislike = async (req, res) => {
  console.log("đã đi đến getInforLikeAndDislike trong LikeController");
  try {
    LikeModel.getInforLikeAndDislike(req.body.userid, req.body.videoid).then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

let checkUserLiked = async (req, res) => {
  console.log("đã đi đến checkUserLiked trong LikeController");
  try {
    LikeModel.checkUserLiked(req.body.userid, req.body.videoid).then((data) => {
      return res.status(200).json(data);
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}


module.exports = {
  insertLikeVideo: insertLikeVideo,
  removeLikeVideo: removeLikeVideo,
  getInforLikeAndDislike: getInforLikeAndDislike,
  checkUserLiked: checkUserLiked,
};