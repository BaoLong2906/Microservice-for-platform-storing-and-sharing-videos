import axios from 'axios';
import axiosClient from './axiosClient';

import { REACT_APP_API_URL } from './axiosClient';

class UserAPI {
  static requestFindProfile = (profileurl, callback) => {
    //{ token: accessToken }
    return axios.post(REACT_APP_API_URL + "/users/" + profileurl)
    .then(res => {
      //console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestFindProile !");
      callback(res.data);
    })
  }

  static requestFindBlogAboutmeByUserID = (userid, callback) => {
    return axios.post(REACT_APP_API_URL + "/users/find-blog-aboutme", { userid: userid })
    .then(res => {
      console.log(res);

      //if (res.data)

      console.log("đã nhận json data từ server thông qua requestFindBlogAboutmeByUserID !");
      callback(res.data);
    })
  }

  static requestFindAllCourseByProfileUrl = (profileurl, callback) => {
    return axios.post(REACT_APP_API_URL + "/users/find-allcourse-by-profileurl", {profileurl: profileurl})
    .then(res => {
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestFindAllCourseByProfileUrl !");
      callback(res.data);
    })
  }

  static requestFindAllVideoByProfileUrl = (profileurl, callback) => {
    return axios.post(REACT_APP_API_URL + "/users/find-allvideo-by-profileurl", {profileurl: profileurl})
    .then(res => {
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestFindAllVideoByProfileUrl !");
      callback(res.data);
    })
  }

}


export default UserAPI;