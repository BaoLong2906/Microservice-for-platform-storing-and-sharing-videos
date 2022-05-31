import axios from 'axios';
import axiosClient from './axiosClient';
import { REACT_APP_API_URL } from './axiosClient'; 


class ProfileAPI {

  static requestUpdateAboutmeBlog = (userid, content, accessToken, callback) => {
    axios.post(REACT_APP_API_URL + "/users/update-blog-aboutme/" + userid, { token: accessToken, content: content })
    .then(res => {
      //console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestUpdateAboutmeBlog !");
      callback(res.data);
    })
  }

  static requestInsertAboutmeBlog = (userid, content, accessToken, callback) => {
    axios.post(REACT_APP_API_URL + "/users/insert-blog-aboutme/" + userid, { token: accessToken, content: content })
    .then(res => {
      console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestInsertAboutmeBlog !");
      callback(res.data);
    })
  }

}

export default ProfileAPI;