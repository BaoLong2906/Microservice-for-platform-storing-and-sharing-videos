let DislikeModel = require('../models/DislikeModel');

let baseURL = require("../helper/ServerOriginURL");
let linkImageStore = baseURL + "/images/";

let insertDislikeVideo = async (req, res) => {
  console.log("đã đi đến insertDislikeVideo trong DislikeController");
  try {
    console.log(req.body.userid + " " + req.body.videoid);
    DislikeModel.insertDislikeVideo(req.body.userid, req.body.videoid).then((data) => {
      if (data == 'insert success') {
        return res.status(200).json({isSuccess: true});
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

let removeDisLikeVideo = async (req, res) => {
  console.log("đã đi đến removeDisLikeVideo trong DislikeController");
  try {
    console.log(req.body.userid + " " + req.body.videoid);
    DislikeModel.removeDislikeVideo(req.body.userid, req.body.videoid).then((data) => {
      if (data == 'remove success') {
        return res.status(200).json({isSuccess: true});
      }
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

let checkUserDisliked = async (req, res) => {
  try {
    DislikeModel.checkUserDisliked(req.body.userid, req.body.videoid).then((data) => {
      console.log(data);
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  insertDislikeVideo: insertDislikeVideo,
  removeDisLikeVideo: removeDisLikeVideo,
  checkUserDisliked: checkUserDisliked,
};