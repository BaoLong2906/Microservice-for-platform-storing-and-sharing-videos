const LikeController = require('../controllers/LikeController');
const DislikeController = require('../controllers/DislikeController');
const BestChoiceController = require('../controllers/BestChoiceController');

var express = require('express');
const DislikeModel = require('../models/DislikeModel');
var router = express.Router();

router.post('/insert-vote-like-video', LikeController.insertLikeVideo);
router.post('/remove-vote-like-video', LikeController.removeLikeVideo);

router.post('/insert-vote-dislike-video', DislikeController.insertDislikeVideo);
router.post('/remove-vote-dislike-video', DislikeController.removeDisLikeVideo);

router.post('/get-infor-like-dislike-of-video', LikeController.getInforLikeAndDislike);

router.post('/check-user-liked', LikeController.checkUserLiked);
router.post('/check-user-disliked', DislikeController.checkUserDisliked);

router.post('/find-best-choice-video', BestChoiceController.getTop3);

module.exports = router;