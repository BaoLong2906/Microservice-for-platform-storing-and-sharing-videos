import axios from 'axios';
import axiosClient from './axiosClient';
import { REACT_APP_API_URL } from './axiosClient';

class PostStatusApi {
  static requestPostStatus (callback) {
    return axios.post(REACT_APP_API_URL + "/post-status")
    .then(res => {
      //console.log(res);
      //console.log(res.data.posts);
      console.log("đã nhận json data từ server thông qua requestFindProile !");
      callback(res.data.posts);
    })
  }

  static insertPostStatus (userid, dataImageAndTextContent, accessToken, callback) {
    return axios.post(REACT_APP_API_URL + "/post-status/insert-poststatus", { token: accessToken, dataImageAndTextContent: dataImageAndTextContent, userid: userid })
    .then(res => {
      //console.log(res);
      //console.log(res.data.posts);
      console.log("đã nhận json data từ server thông qua insertPostStatus !");
      callback(res.data.isSuccess);
    })
  }

  static getCommentByPostId (postid, callback) {
    return axios.post(REACT_APP_API_URL + "/post-status/get-comment-by-postid", {postid: postid})
    .then(res => {
      console.log("đã nhận json data từ server thông qua getCommentByPostId !");
      console.log(res.data);
      callback(res.data.comment);
    })
  }

  static insertComment (userid, postid, commentcontent, accessToken, callback) {
    return axios.post(REACT_APP_API_URL + "/post-status/insert-comment", {userid: userid, postid: postid, token: accessToken, commentcontent: commentcontent})
    .then(res => {
      console.log("đã nhận json data từ server thông qua insertComment !");
      console.log(res.data);
      callback(res.data.isSuccess);
    })
  }

  // http://localhost:7000/post-status/upload-imagepoststatus/

}

export default PostStatusApi;